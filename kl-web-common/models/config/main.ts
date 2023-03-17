import {PxEmaPeriodPair} from './emaPair';
import {DataPeriodModel} from './period';
import {PxSourceModel} from './source';
import {SrLevelConfigModel} from './srLevel';


// Should have the same fields available in `KL.Common.PxConfigModel` of `kl-site-compute`
export type PxConfigModel = {
  emaNet: PxEmaPeriodPair,
  emaStrongSr: PxEmaPeriodPair[],
  srLevel: SrLevelConfigModel,
  sources: Record<string, PxSourceModel>,
  periods: DataPeriodModel[],
};
