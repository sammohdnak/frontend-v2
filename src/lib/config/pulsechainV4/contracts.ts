import { Contracts } from '../types';
import * as pulsechainV4 from '@/assets/data/contracts/pulsechainV4.json';

const contracts: Contracts = {
  merkleRedeem: '',
  merkleOrchard: '',
  multicall: '0xca11bde05977b3631167028862be2a173976ca11',
  authorizer: pulsechainV4.Authorizer,
  vault: pulsechainV4.Vault,
  router: pulsechainV4.Router,
  permit2: pulsechainV4.Permit2,
  weightedPoolFactory: pulsechainV4.WeightedPoolFactory,
  stablePoolFactory: pulsechainV4.ComposableStablePoolFactory,
  lidoRelayer: '',
  balancerHelpers: pulsechainV4.BalancerHelpers,
  batchRelayer: pulsechainV4.BalancerRelayer,
  gaugeFactory: '0x99FE8348aDA1f369e9d8295e8335BED2C8c9e916',
  balancerMinter: pulsechainV4.BalancerMinter,
  gaugeController: pulsechainV4.GaugeController,
  tokenAdmin: pulsechainV4.BalancerTokenAdmin,
  veBAL: pulsechainV4.VotingEscrow,
  veDelegationProxy: '',
  veBALHelpers: '',
  feeDistributor: '',
  feeDistributorDeprecated: '',
  faucet: '',
  gaugeRewardsHelper: '',
};

export default contracts;
