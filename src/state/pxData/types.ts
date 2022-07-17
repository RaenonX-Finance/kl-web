import {PxDataMap, PxDataMapSlotNames} from '../../types/pxData';
import {StateBase} from '../types';


export const PX_DATA_STATE_NAME = 'PxData';

export enum PxDataDispatcherName {
  INIT = 'initPx',
  UPDATE = 'updatePx',
  UPDATE_MARKET = 'updateMarketPx',
}

export type PxDataSlotMap = {[uniqueIdentifier in string]?: PxDataMapSlotNames};

export type PxDataState = StateBase & {
  data: PxDataMap,
  map: PxDataSlotMap | null,
};
