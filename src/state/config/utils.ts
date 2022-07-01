import {PxChartLayoutConfigState} from './types';


export const getInitialConfigSingle = () : PxChartLayoutConfigState => ({
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
});
