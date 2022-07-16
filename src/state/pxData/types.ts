import {PxDataMap, PxDataMapSlotNames} from '../../types/pxData';
import {StateBase} from '../types';


export const PX_DATA_STATE_NAME = 'PxData';

export enum PxDataDispatcherName {
  INIT = 'initPx',
  INIT_SLOT_MAP = 'initSlotMap',
  UPDATE = 'updatePx',
  UPDATE_MARKET = 'updateMarketPx',
  UPDATE_CHART_MAP = 'updateChartMap',
}

export type PxDataSlotMap = {[uniqueIdentifier in string]?: PxDataMapSlotNames};

export type PxDataState = StateBase & {
  data: PxDataMap,
  map: PxDataSlotMap | null,
};

export type PxDataUpdateChartMapEntry = {
  slot: PxDataMapSlotNames,
  uniqueIdentifier: string
};

export type PxDataUpdateChartMap = PxDataUpdateChartMapEntry[];
