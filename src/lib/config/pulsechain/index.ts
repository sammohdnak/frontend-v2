import { Config } from '../types';
import contracts from './contracts';
import keys from './keys';
import tokenlists from './tokenlists';
import tokens from './tokens';
import pools from './pools';
import rateProviders from './rateProviders';

const config: Config = {
  key: '369',
  chainId: 369,
  layerZeroChainId: 10161,
  chainName: 'Pulsechain',
  name: 'Pulsechain',
  shortName: 'Pulsechain',
  monorepoName: 'pulsechain',
  slug: 'pulsechain',
  network: 'pulsechain',
  trustWalletNetwork: 'pulsechain',
  unknown: false,
  visibleInUI: true,
  testNetwork: false, //TODO make it to test network later
  rpc: `https://rpc.pulsechain.com`,
  ws: ``,
  explorer: 'https://otter.pulsechain.com',
  explorerName: 'Etherscan',
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
      'https://api.studio.thegraph.com/query/51820/tide-gauges/version/latest',
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
