import {PxDataMap, PxDataMapSlotNames} from '../../types/pxData';
import {StateBase} from '../types';


export const PX_DATA_STATE_NAME = 'PxData';

export enum PxDataDispatcherName {
  INIT = 'initPx',
  UPDATE = 'updatePx',
  UPDATE_MARKET = 'updateMarketPx',
  UPDATE_CHART_MAP = 'updateChartMap',
}

export type PxDataState = StateBase & {
  data: PxDataMap,
  map: {[uniqueIdentifier in string]?: PxDataMapSlotNames},
};

export type PxDataSelectorReturn = PxDataState;

export type PxDataUpdateChartMapEntry = {
  slot: PxDataMapSlotNames,
  uniqueIdentifier: string
};

export type PxDataUpdateChartMap = PxDataUpdateChartMapEntry[];
