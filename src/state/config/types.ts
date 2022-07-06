import {LayoutType} from '../../components/chart/layoutSelector/type';
import {PxChartLayoutConfigKeys} from '../../components/chart/pxData/type';
import {PxDataMapSlotNames} from '../../types/pxData';
import {StateBase} from '../types';


export const CONFIG_STATE_NAME = 'Config';

export enum ConfigDispatcherName {
  UPDATE_LAYOUT = 'updateLayout',
  UPDATE_LAYOUT_CONFIG = 'updateLayoutConfig',
}

export type PxChartLayoutConfigState = {[key in PxChartLayoutConfigKeys]?: boolean};

export type ConfigState = StateBase & {
  layoutType: LayoutType,
  layoutConfig: {[name in PxDataMapSlotNames]: PxChartLayoutConfigState},
};

export type LayoutConfigUpdatePayload = {
  slot: PxDataMapSlotNames,
  configKey: PxChartLayoutConfigKeys,
  value: boolean,
};
