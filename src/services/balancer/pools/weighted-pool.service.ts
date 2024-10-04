import { toNormalizedWeights } from '@balancer-labs/sdk';
import {
  Vault__factory,
  WeightedPool__factory,
  WeightedPoolFactory__factory,
} from '@balancer-labs/typechain';
import { defaultAbiCoder } from '@ethersproject/abi';
import { BigNumber as EPBigNumber } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';
import { JsonRpcProvider, TransactionResponse } from '@ethersproject/providers';
import { WalletProvider } from '@/dependencies/wallets/Web3Provider';
import BigNumber from 'bignumber.js';
import { formatUnits, parseUnits } from '@ethersproject/units';

import { PoolSeedToken } from '@/composables/pools/usePoolCreation';
import { isSameAddress, scale } from '@/lib/utils';
import { configService } from '@/services/config/config.service';
import { TransactionBuilder } from '@/services/web3/transactions/transaction.builder';
import { getOldMulticaller } from '@/dependencies/OldMulticaller';
import { POOLS } from '@/constants/pools';
import WeightedPoolFactoryV3Abi from '@/lib/abi/WeightedPoolFactoryBalV3.json';
import { generateSalt } from '@/lib/utils/random';

type Address = string;

export interface CreatePoolReturn {
  id: string;
  address: Address;
}

const JOIN_KIND_INIT = 0;

export interface JoinPoolRequest {
  assets: Address[];
  maxAmountsIn: string[];
  userData: any;
  fromInternalBalance: boolean;
}

export default class WeightedPoolService {
  public async create(
    provider: WalletProvider,
    name: string,
    symbol: string,
    swapFee: string,
    tokens: PoolSeedToken[],
    owner: Address
  ): Promise<TransactionResponse> {
    if (!owner.length) return Promise.reject('No pool owner specified');
console.log('PoolSeed Token',tokens,swapFee)
    const tokenAddresses: Address[] = tokens.map((token: PoolSeedToken) => {
      return token.tokenAddress;
    });

    const tokensTuple = tokens.map((token) => ({
      token: token.tokenAddress,
      tokenType: 0,
      rateProvider: POOLS.ZeroAddress,
      paysYieldFees:false
    }))

    const normalizedWeights = tokens.map(token=>parseUnits(token.weight.toString(),16))


    const roleAccounts = {
      pauseManager: POOLS.ZeroAddress,
      swapFeeManager: POOLS.ZeroAddress,
      poolCreator: POOLS.ZeroAddress,
    };

    const swapFeePercentage = parseUnits("0.0001", 18); // 0.01% (100000000000000)

    const poolHooksContract = POOLS.ZeroAddress;
  const enableDonation = false;
  const disableUnbalancedLiquidity = false;
  const salt =
    "0x0000000000000000000000000000000000000000000000000000000000000002";



    const seedTokens = this.calculateTokenWeights(tokens);
    const swapFeeScaled = scale(new BigNumber(swapFee), 18);
    const rateProviders = Array(tokenAddresses.length).fill(POOLS.ZeroAddress);

    // const params = [
    //   name,
    //   symbol,
    //   tokenAddresses,
    //   seedTokens,
    //   rateProviders,
    //   swapFeeScaled.toString(),
    //   owner,
    //   generateSalt(),
    // ];

    const params = [
      name,
      symbol,
      tokensTuple,
      normalizedWeights,
      roleAccounts,
      swapFeePercentage,
      poolHooksContract,
      enableDonation,
      disableUnbalancedLiquidity,
      salt
    ]

    const txBuilder = new TransactionBuilder(provider.getSigner());
    return await txBuilder.contract.sendTransaction({
      contractAddress: configService.network.addresses.weightedPoolFactory,
      abi: WeightedPoolFactoryV3Abi,
      action: 'create',
      params,
    });
  }

  public async retrievePoolIdAndAddress(
    provider: WalletProvider | JsonRpcProvider,
    createHash: string
  ): Promise<CreatePoolReturn | null> {
    const receipt = await provider.getTransactionReceipt(createHash);
    if (!receipt) return null;

    const weightedPoolFactoryInterface =
      WeightedPoolFactory__factory.createInterface();

    const poolCreationEvent = receipt.logs
      .filter(
        log =>
          log.address === configService.network.addresses.weightedPoolFactory
      )
      .map(log => {
        try {
          return weightedPoolFactoryInterface.parseLog(log);
        } catch {
          return null;
        }
      })
      .find(parsedLog => parsedLog?.name === 'PoolCreated');

    if (!poolCreationEvent) return null;
    const poolAddress = poolCreationEvent.args.pool;

    const pool = WeightedPool__factory.connect(poolAddress, provider);
    const poolId = await pool.getPoolId();

    return {
      id: poolId,
      address: poolAddress,
    };
  }

  public async retrievePoolDetails(
    provider: WalletProvider | JsonRpcProvider,
    hash: string
  ) {
    if (!hash) return;
    const poolDetails = await this.retrievePoolIdAndAddress(provider, hash);
    if (poolDetails === null) return;

    const poolAddress = poolDetails.address;
    const vaultAddress = configService.network.addresses.vault;

    const Multicaller = getOldMulticaller();
    const multicaller = new Multicaller(configService.network.key, provider, [
      ...WeightedPool__factory.abi,
      ...Vault__factory.abi,
    ]);

    multicaller.call('name', poolAddress, 'name');
    multicaller.call('symbol', poolAddress, 'symbol');
    multicaller.call('owner', poolAddress, 'getOwner');
    multicaller.call('weights', poolAddress, 'getNormalizedWeights');
    multicaller.call('tokenInfo', vaultAddress, 'getPoolTokens', [
      poolDetails.id,
    ]);

    const multicall = await multicaller.execute();

    const details = {
      weights: multicall.weights.map(weight => formatUnits(weight, 18)),
      name: multicall.name,
      owner: multicall.owner,
      symbol: multicall.symbol,
      tokens: multicall.tokenInfo.tokens,
    };
    return details;
  }

  public async initJoin(
    provider: WalletProvider,
    poolId: string,
    sender: Address,
    receiver: Address,
    tokenAddresses: Address[],
    initialBalancesString: string[]
  ): Promise<TransactionResponse> {
    const initUserData = defaultAbiCoder.encode(
      ['uint256', 'uint256[]'],
      [JOIN_KIND_INIT, initialBalancesString]
    );

    const value = this.value(initialBalancesString, tokenAddresses);

    tokenAddresses = this.parseTokensIn(tokenAddresses);

    const joinPoolRequest: JoinPoolRequest = {
      assets: tokenAddresses,
      maxAmountsIn: initialBalancesString,
      userData: initUserData,
      fromInternalBalance: false,
    };

    const vaultAddress = configService.network.addresses.vault;

    const txBuilder = new TransactionBuilder(provider.getSigner());
    return await txBuilder.contract.sendTransaction({
      contractAddress: vaultAddress,
      abi: Vault__factory.abi,
      action: 'joinPool',
      params: [poolId, sender, receiver, joinPoolRequest],
      options: { value },
    });
  }

  public calculateTokenWeights(tokens: PoolSeedToken[]): string[] {
    const weights: EPBigNumber[] = tokens.map((token: PoolSeedToken) => {
      const normalizedWeight = new BigNumber(token.weight).multipliedBy(
        new BigNumber(1e16)
      );
      return EPBigNumber.from(normalizedWeight.toString());
    });
    const normalizedWeights = toNormalizedWeights(weights);
    const weightStrings = normalizedWeights.map((weight: EPBigNumber) => {
      return weight.toString();
    });

    return weightStrings;
  }

  private value(amountsIn: string[], tokensIn: string[]): EPBigNumber {
    let value = '0';
    const nativeAsset = configService.network.nativeAsset;

    amountsIn.forEach((amount, i) => {
      if (tokensIn[i] === nativeAsset.address) {
        value = amount;
      }
    });

    return EPBigNumber.from(value);
  }

  private parseTokensIn(tokensIn: string[]): string[] {
    const nativeAsset = configService.network.nativeAsset;

    return tokensIn.map(address =>
      isSameAddress(address, nativeAsset.address) ? AddressZero : address
    );
  }
}
