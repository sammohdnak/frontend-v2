import { QueryObserverOptions, useQuery } from '@tanstack/vue-query';
import { computed, reactive, Ref, ref } from 'vue';

import { Address, GraphQLArgs, OnchainTokenData, PoolType } from '@balancer-labs/sdk';

import QUERY_KEYS from '@/constants/queryKeys';
import { useTokens } from '@/providers/tokens.provider';

import { poolsStoreService } from '@/services/pool/pools-store.service';
import { Pool } from '@/services/pool/types';

import { tokensListExclBpt, tokenTreeLeafs } from '../usePoolHelpers';

import { POOLS } from '@/constants/pools';
import { configService } from '@/services/config/config.service';
import { PoolDecorator } from '@/services/pool/decorators/pool.decorator';
import PoolRepository from '@/services/pool/pool.repository';
import { getApi } from '@/dependencies/balancer-api';
import { networkConfig } from '../useNetwork';
import { GqlChain } from '@/services/api/graphql/generated/api-types';

type QueryOptions = QueryObserverOptions<Pool>;

export default function usePoolQuery(
  id: string,
  isEnabled: Ref<boolean> = ref(true),
  options: QueryOptions = {}
) {
  /**
   * If pool is already downloaded, we can use it instantly
   * it may be if user came to pool page from home page
   */
  const poolInfo = poolsStoreService.findPool(id);

  /**
   * COMPOSABLES
   */
  const { injectTokens, tokens } = useTokens();

  const poolRepository = new PoolRepository(tokens);

  /**
   * COMPUTED
   */
  const enabled = computed(() => isEnabled.value);

  /**
   * METHODS
   */

  function getQueryArgs(): GraphQLArgs {
    const queryArgs: GraphQLArgs = {
      chainId: configService.network.chainId,
      where: {
        id: { eq: id?.toLowerCase() },
        totalShares: { gt: -1 }, // Avoid the filtering for low liquidity pools
        poolType: { in: POOLS.IncludedPoolTypes },
      },
    };
    return queryArgs;
  }

  /**
   * QUERY INPUTS
   */
  const queryKey = QUERY_KEYS.Pools.Current(id);

  const queryFn = async () => {
    let pool: Pool;
    if (poolInfo) {
      pool = poolInfo;
    } else {
      const api = getApi();
      //TODO change to mainnet
      const pool_res = await api.GetPool({ id: id?.toLowerCase(), chain: GqlChain.PulsechainV4 })
      
      let _pool = pool_res.pool

      let onChainTokens: Record<Address, OnchainTokenData>;
      onChainTokens = {}
      for (const _token of _pool.poolTokens) {
        onChainTokens[_token.address] = {
          balance: _token.balance,
          weight: Number(_token.weight || 80),
          decimals:_token.decimals,
          logoURI:'',
          symbol:_token.symbol,
          name:_token.name
          
        }
      }
      
      pool = {
        // address: _pool.address,
        // tokens: _pool.poolTokens,
        id: _pool.id,
    name: _pool.name,
        address: _pool.address,
    //TODO change below to mainnet
    chainId: configService.env.VITE_IS_MAINNET?369:943,
    poolType: 'Weighted' as PoolType,
    poolTypeVersion: _pool.protocolVersion,
    swapFee: _pool.dynamicData.swapFee,
    protocolYieldFeeCache: _pool.dynamicData.swapFee,
    protocolSwapFeeCache: _pool.dynamicData.swapFee,
    owner: _pool.owner as string,
    factory: _pool.factory as string,
    tokens: _pool.poolTokens,
    tokensList: _pool.poolTokens.map(item=>item.address),
    tokenAddresses: _pool.poolTokens.map(item=>item.address),
    totalLiquidity: _pool.dynamicData.totalLiquidity,
    totalShares: _pool.dynamicData.totalShares,
    totalSwapFee: _pool.dynamicData.swapFee,
    totalSwapVolume: _pool.dynamicData.volume24h,
        onchain: {
          tokens: onChainTokens,
          totalSupply: _pool.dynamicData.totalShares,
          decimals: _pool.decimals,
          swapFee: _pool.dynamicData.swapFee,
          // amp?: string;
          swapEnabled: _pool.dynamicData.swapEnabled,
          // linearPools?: Record<Address, LinearPoolData>;
          // tokenRates?: string[];
    },
    // createTime?: _pool.id,
    // mainTokens?: _pool.id,
    // wrappedTokens?: _pool.id,
    // unwrappedTokens?: _pool.id,
    // isNew?: _pool.id,
    // volumeSnapshot?: _pool.id,
    // feesSnapshot?: _pool.id,
    // boost?: _pool.id,
    // symbol?: _pool.id,
    swapEnabled: _pool.dynamicData.swapEnabled,
    // amp?: _pool.id,
    // wrappedIndex?: _pool.id,
    // mainIndex?: _pool.id,
    // apr?: _pool.id,
    // liquidity?: _pool.id,
    totalWeight: _pool.id,
    lowerTarget: _pool.id,
    upperTarget: _pool.id,
    // priceRateProviders?: _pool.id,
    // lastJoinExitInvariant?: _pool.id,
    // isInRecoveryMode?: _pool.id,
    // isPaused?: _pool.id,
    // tokenRates?: _pool.id,
      }

    }

    console.log('pool found',pool)

    if (!pool) throw new Error('Pool does not exist');

    // If the pool is cached from homepage it may not have onchain set, so update it
    if (!pool.onchain) {
      const poolDecorator = new PoolDecorator([pool]);
      [pool] = await poolDecorator.decorate(tokens.value, false);
    }

    // Inject pool tokens into token registry
    injectTokens([
      ...tokensListExclBpt(pool),
      ...tokenTreeLeafs(pool.tokens),
      pool.address, // We need to inject pool addresses so we can fetch a user's balance for that pool.
    ]);

    return pool;
  };

  const queryOptions = reactive({
    enabled,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
  });

  return useQuery<Pool>(queryKey, queryFn, queryOptions as QueryOptions);
}
