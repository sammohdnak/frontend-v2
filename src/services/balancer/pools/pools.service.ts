import StablePoolService from './stable-pool.service';
import WeightedPoolService from './weighted-pool.service';

export default class PoolsService {
  weighted: WeightedPoolService;
  stable: StablePoolService;

  constructor() {
    this.weighted = new WeightedPoolService();
    this.stable = new StablePoolService()
  }
}

export const poolsService = new PoolsService();
