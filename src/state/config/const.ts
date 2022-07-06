import {PxChartLayoutConfigState} from './types';


export const initialConfig: Required<PxChartLayoutConfigState> = {
  currentPxLine: true,
  tiePointLabel: true,
  emaNetLabel: false,
  emaStrongSrLabel: false,
  srLevelLabel: true,
  candlestickColor: false,
  tiePoint: false,
  emaNet: false,
  emaStrongSr: false,
  srLevel: false,
  inChartExtrema: true,
  inChartExtremaLabel: true,
};
