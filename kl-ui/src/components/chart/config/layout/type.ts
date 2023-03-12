import {KeysOfType} from '../../../../utils/types';
import {PxConfigEntriesGroup, PxConfigUI} from '../type';


export type PxLayoutConfigSingle = {
  currentPxLine: boolean,
  tiePointLabel: boolean,
  emaNetLabel: boolean,
  emaStrongSrLabel: boolean,
  srLevelLabel: boolean,
  candlestickColor: boolean,
  tiePoint: boolean,
  emaNet: boolean,
  emaStrongSr: boolean,
  srLevel: boolean,
  inChartExtrema: boolean,
  inChartExtremaLabel: boolean,
};

export type PxLayoutConfigKeys = keyof PxLayoutConfigSingle;

export type PxLayoutConfigBoolValKeys = KeysOfType<PxLayoutConfigSingle, boolean>;

export type PxLayoutConfigUI = PxConfigUI<PxLayoutConfigKeys, string, PxLayoutConfigSingle>;

export type PxLayoutConfigGroup = PxConfigEntriesGroup<PxLayoutConfigKeys, string, PxLayoutConfigSingle>;
