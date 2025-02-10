import { Contracts } from '../types';
import * as pulsechain from '@/assets/data/contracts/pulsechain.json';

const contracts: Contracts = {
  merkleRedeem: '',
  merkleOrchard: '',
  multicall: '0xca11bde05977b3631167028862be2a173976ca11',
  authorizer: pulsechain.Authorizer,
  vault: pulsechain.Vault,
  router: pulsechain.Router,
  permit2: pulsechain.Permit2,
  weightedPoolFactory: pulsechain.WeightedPoolFactory,
  stablePoolFactory: pulsechain.ComposableStablePoolFactory,
  lidoRelayer: '',
  balancerHelpers: pulsechain.BalancerHelpers,
  batchRelayer: pulsechain.BalancerRelayer,
  gaugeFactory: '0x9f4b7e594Cf7Fc24311eF1bD937F4A3A778B47d8',
  balancerMinter: pulsechain.BalancerMinter,
  gaugeController: pulsechain.GaugeController,
  tokenAdmin: pulsechain.BalancerTokenAdmin,
  veBAL: pulsechain.VotingEscrow,
  veDelegationProxy: '',
  veBALHelpers: '',
  feeDistributor: '',
  feeDistributorDeprecated: '',
  faucet: '',
  gaugeRewardsHelper: '',
};

export default contracts;
