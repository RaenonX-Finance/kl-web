import {PxDataMap, PxDataMapSlotNames} from '../../types/pxData';
import {StateBase} from '../types';


export const PX_DATA_STATE_NAME = 'PxData';

export enum PxDataDispatcherName {
  INIT = 'PxData/Init',
  UPDATE_COMPLETE = 'PxData/UpdateComplete',
  UPDATE_MARKET = 'PxData/UpdateMarket',
}

export type PxDataSlotMap = {[uniqueIdentifier in string]?: PxDataMapSlotNames};

export type PxDataState = StateBase & {
  data: PxDataMap,
  map: PxDataSlotMap | null,
};
