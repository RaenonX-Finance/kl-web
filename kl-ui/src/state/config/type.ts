import {PxLayoutConfigKeys, PxLayoutConfigSingle} from '../../components/chart/config/layout/type';
import {PxSharedConfig} from '../../components/chart/config/shared/type';
import {LayoutType} from '../../components/chart/layoutSelector/type';
import {PxSlotName} from '../../types/pxData';
import {StateBase} from '../types';


export const CONFIG_STATE_NAME = 'Config';

export enum ConfigDispatcherName {
  UPDATE_LAYOUT_TYPE = 'Config/UpdateLayoutType',
  UPDATE_LAYOUT_CONFIG = 'Config/UpdateLayoutConfig',
  UPDATE_SHARED_CONFIG = 'Config/UpdateSharedConfig',
}

export type PxLayoutConfig = {[name in PxSlotName]: PxLayoutConfigSingle};

export type ConfigState = StateBase & {
  layoutType: LayoutType | null,
  layoutConfig: PxLayoutConfig | null,
  sharedConfig: PxSharedConfig | null,
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

export type SharedConfigUpdatePayload = {
  token: string | undefined,
  updated: PxSharedConfig,
};

export type UseSingleLayoutConfigReturn = {
  layoutConfig: PxLayoutConfigSingle | null,
  isReady: boolean,
};

export type ApiUpdateConfigCommonPayload = {
  token: string | null | undefined,
};
