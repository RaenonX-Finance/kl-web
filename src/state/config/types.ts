import {LayoutType} from '../../components/chart/layoutSelector/type';
import {StateBase} from '../types';


export const CONFIG_STATE_NAME = 'Config';

export enum ConfigDispatcherName {
  UPDATE_LAYOUT = 'updateLayout',
}

export type ConfigState = StateBase & {
  layoutType: LayoutType,
};

export type ConfigSelectorReturn = ConfigState;
