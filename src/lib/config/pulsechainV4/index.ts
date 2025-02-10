import { Config } from '../types';
import contracts from './contracts';
import keys from './keys';
import tokenlists from './tokenlists';
import tokens from './tokens';
import pools from './pools';
import rateProviders from './rateProviders';

const config: Config = {
  key: '943',
  chainId: 943,
  layerZeroChainId: 10161,
  chainName: 'PulsechainV4',
  name: 'Pulsechain Testnet V4',
  shortName: 'PulsechainV4',
  monorepoName: 'pulsechainV4',
  slug: 'pulsechainV4',
  network: 'pulsechainV4',
  trustWalletNetwork: 'pulsechainV4',
  unknown: false,
  visibleInUI: true,
  testNetwork: false, //TODO make it to test network later
  rpc: `https://rpc.v4.testnet.pulsechain.com`,
  ws: ``,
  explorer: 'https://scan.v4.testnet.pulsechain.com/#',
  explorerName: 'Pulsescan',
  subgraph:
    'https://api.studio.thegraph.com/query/24660/balancer-sepolia-v2/version/latest',
  poolsUrlV2: '',
  subgraphs: {
    main: [
      // 'https://api.studio.thegraph.com/query/24660/balancer-sepolia-v2/version/latest',
      'http://localhost:4000/graphql',
    ],
    aave: '',
    gauge:
      'https://nhailbiqw4.execute-api.us-east-2.amazonaws.com/subgraphs/name/sammohdnak/tide-gauges-1',
    blocks: '',
  },
  bridgeUrl: '',
  supportsEIP1559: true,
  supportsElementPools: true,
  blockTime: 12,
  nativeAsset: {
    name: 'Pulse Ether',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    symbol: 'PLS',
    decimals: 18,
    deeplinkId: 'ether',
    logoURI: 'tokens/eth.png',
    minTransactionBuffer: '0.05',
  },
  thirdParty: {
    coingecko: {
      nativeAssetId: 'ethereum',
      platformId: 'ethereum',
    },
  },
  addresses: {
    ...contracts,
  },
  pools,
  tokens,
  keys,
  gauges: {
    type: 2,
    weight: 100,
  },
  tokenlists,
  rateProviders,
};

export default config;
