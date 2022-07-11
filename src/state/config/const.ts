import {PxChartLayoutConfigState} from './types';


export const initialConfig: Required<PxChartLayoutConfigState> = {
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
};
