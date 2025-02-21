import { Config } from '../types';
import contracts from './contracts';
import keys from './keys';
import tokenlists from './tokenlists';
import tokens from './tokens';
import pools from './pools';
import rateProviders from './rateProviders';

const config: Config = {
  key: '11155111',
  chainId: 11155111,
  layerZeroChainId: 10161,
  chainName: 'Sepolia',
  name: 'Ethereum Testnet Sepolia',
  shortName: 'Sepolia',
  monorepoName: 'sepolia',
  slug: 'sepolia',
  network: 'sepolia',
  trustWalletNetwork: 'ethereum',
  unknown: false,
  visibleInUI: true,
  testNetwork: false, //TODO make it to test network later
  rpc: `https://eth-sepolia.g.alchemy.com/v2/oT2Lf4RLmmJ-c_43vxf0KY0NnBx3_0C7`,
  ws: ``,
  explorer: 'https://sepolia.etherscan.io',
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
    name: 'Ether',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    symbol: 'ETH',
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
