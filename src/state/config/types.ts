import {LayoutType} from '../../components/chart/layoutSelector/type';
import {PxChartLayoutConfigKeys} from '../../components/chart/pxData/type';
import {PxDataMapSlotNames} from '../../types/pxData';
import {StateBase} from '../types';


export const CONFIG_STATE_NAME = 'Config';

export enum ConfigDispatcherName {
  UPDATE_LAYOUT = 'updateLayout',
  UPDATE_LAYOUT_CONFIG = 'updateLayoutConfig',
}

export type PxChartLayoutConfigSingle = {[key in PxChartLayoutConfigKeys]?: boolean};

export type PxChartLayoutConfig = {[name in PxDataMapSlotNames]: PxChartLayoutConfigSingle};

export type ConfigState = StateBase & {
  layoutType: LayoutType | null,
  layoutConfig: PxChartLayoutConfig | null,
};

export type LayoutConfigUpdatePayload = {
  slot: PxDataMapSlotNames,
  configKey: PxChartLayoutConfigKeys,
  value: boolean,
};

export type UseSingleLayoutConfigReturn = {
  layoutConfig: PxChartLayoutConfigSingle | null,
  isReady: boolean,
};
