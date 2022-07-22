import {PxLayoutConfigSingle} from '../../components/chart/pxData/type';


export const defaultLayoutConfig: Required<PxLayoutConfigSingle> = {
  currentPxLine: true,
  tiePointLabel: true,
  emaNetLabel: false,
  emaStrongSrLabel: false,
  srLevelLabel: true,
  srLevelBasicLabel: true,
  candlestickColor: false,
  tiePoint: false,
  emaNet: false,
  emaStrongSr: false,
  srLevel: false,
  srLevelBasic: false,
  inChartExtrema: true,
  inChartExtremaLabel: true,
  intervalMarketPxSec: 0.3,
  intervalHistoryPxSec: 5,
};
