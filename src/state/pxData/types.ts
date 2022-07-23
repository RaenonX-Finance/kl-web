import {PxDataMap, PxDataUniqueIdentifier, PxSlotName} from '../../types/pxData';
import {StateBase} from '../types';


export const PX_DATA_STATE_NAME = 'PxData';

export enum PxDataDispatcherName {
  INIT = 'PxData/Init',
  UPDATE_COMPLETE = 'PxData/UpdateComplete',
  UPDATE_MARKET = 'PxData/UpdateMarket',
  UPDATE_SLOT_MAP = 'PxData/UpdateSlotMap',
}

export type PxSlotMap = {[name in PxSlotName]: PxDataUniqueIdentifier};

export type PxDataState = StateBase & {
  data: PxDataMap,
  map: PxSlotMap | null,
};

export type PxSlotMapUpdatePayload = {
  token: string | null | undefined,
  slot: PxSlotName,
  symbol: string,
  periodMin: number,
};

export type PxDataSubscriptionInfo = {
  securities: string[],
  identifiers: string[],
};

export type PxMarketUpdateMeta = {
  securities: string[],
};
