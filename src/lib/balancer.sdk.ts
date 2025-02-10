import { BalancerSDK } from '@balancer-labs/sdk';
import { Network } from '@/lib/config/types';
import { configService } from '@/services/config/config.service';
import { ref } from 'vue';
// import { isTestMode } from '@/plugins/modes';

//Note - I have hardcoded sepolia Chain Id as Balancer SDK does not have pulse & v4
export const balancer = new BalancerSDK({
  network: 11155111,
  rpcUrl: configService.rpc,
  customSubgraphUrl: configService.network.subgraph,
});

export const hasFetchedPoolsForSor = ref(false);

export async function fetchPoolsForSor() {
  if (hasFetchedPoolsForSor.value) return;

  console.time('fetchPoolsForSor');
  await balancer.swaps.fetchPools();
  hasFetchedPoolsForSor.value = true;
  console.timeEnd('fetchPoolsForSor');
}

// if (!isTestMode()) fetchPoolsForSor();
