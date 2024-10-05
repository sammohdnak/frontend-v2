import { Contracts } from '../types';
import * as sepolia from '@/assets/data/contracts/sepolia.json';

const contracts: Contracts = {
  merkleRedeem: '',
  merkleOrchard: '',
  multicall: '0xca11bde05977b3631167028862be2a173976ca11',
  authorizer: sepolia.Authorizer,
  vault: sepolia.Vault,
  router: sepolia.Router,
  permit2: sepolia.Permit2,
  weightedPoolFactory: sepolia.WeightedPoolFactory,
  stablePoolFactory: sepolia.ComposableStablePoolFactory,
  lidoRelayer: '',
  balancerHelpers: sepolia.BalancerHelpers,
  batchRelayer: sepolia.BalancerRelayer,
  gaugeFactory: '0x5c6F4dAF55029A74681B0665b0B1cd670a728b55',
  balancerMinter: sepolia.BalancerMinter,
  gaugeController: sepolia.GaugeController,
  tokenAdmin: sepolia.BalancerTokenAdmin,
  veBAL: sepolia.VotingEscrow,
  veDelegationProxy: '',
  veBALHelpers: '',
  feeDistributor: '',
  feeDistributorDeprecated: '',
  faucet: '',
  gaugeRewardsHelper: '',
};

export default contracts;
