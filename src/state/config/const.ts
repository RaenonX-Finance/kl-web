import {PxChartLayoutConfigSingle} from '../../components/chart/pxData/type';


export const defaultConfig: Required<PxChartLayoutConfigSingle> = {
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
};
