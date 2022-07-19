import {LayoutType} from '../../components/chart/layoutSelector/type';
import {PxChartLayoutConfigKeys, PxChartLayoutConfigSingle} from '../../components/chart/pxData/type';
import {PxSlotName} from '../../types/pxData';
import {StateBase} from '../types';


export const CONFIG_STATE_NAME = 'Config';

export enum ConfigDispatcherName {
  UPDATE_LAYOUT_TYPE = 'Config/UpdateLayoutType',
  UPDATE_LAYOUT_CONFIG = 'Config/UpdateLayoutConfig',
}

export type PxChartLayoutConfig = {[name in PxSlotName]: PxChartLayoutConfigSingle};

export type ConfigState = StateBase & {
  layoutType: LayoutType | null,
  layoutConfig: PxChartLayoutConfig | null,
};

export type LayoutTypeUpdatePayload = {
  token: string | undefined,
  layoutType: LayoutType,
};

export type LayoutConfigUpdatePayload = {
  token: string | undefined,
  slot: PxSlotName,
  configKey: PxChartLayoutConfigKeys,
  value: boolean,
};

export type UseSingleLayoutConfigReturn = {
  layoutConfig: PxChartLayoutConfigSingle | null,
  isReady: boolean,
};

export type ApiUpdateConfigCommonPayload = {
  token: string | null | undefined,
};
