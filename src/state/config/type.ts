import {LayoutType} from '../../components/chart/layoutSelector/type';
import {PxLayoutConfigKeys, PxLayoutConfigSingle} from '../../components/chart/pxData/type';
import {PxSlotName} from '../../types/pxData';
import {StateBase} from '../types';


export const CONFIG_STATE_NAME = 'Config';

export enum ConfigDispatcherName {
  UPDATE_LAYOUT_TYPE = 'Config/UpdateLayoutType',
  UPDATE_LAYOUT_CONFIG = 'Config/UpdateLayoutConfig',
}

export type PxLayoutConfig = {[name in PxSlotName]: PxLayoutConfigSingle};

export type ConfigState = StateBase & {
  layoutType: LayoutType | null,
  layoutConfig: PxLayoutConfig | null,
};

export type LayoutTypeUpdatePayload = {
  token: string | undefined,
  layoutType: LayoutType,
};

export type LayoutConfigUpdatePayload = {
  token: string | undefined,
  slot: PxSlotName,
  configKey: PxLayoutConfigKeys,
  value: PxLayoutConfigSingle[PxLayoutConfigKeys],
};

export type UseSingleLayoutConfigReturn = {
  layoutConfig: PxLayoutConfigSingle | null,
  isReady: boolean,
};

export type ApiUpdateConfigCommonPayload = {
  token: string | null | undefined,
};
