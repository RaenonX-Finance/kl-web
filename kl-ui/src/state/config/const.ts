import {PxLayoutConfigSingle} from '../../components/chart/config/layout/type';
import {PxSharedConfig} from '../../components/chart/config/shared/type';


export const defaultLayoutConfig: PxLayoutConfigSingle = {
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

export const defaultSharedConfig: PxSharedConfig = {};
