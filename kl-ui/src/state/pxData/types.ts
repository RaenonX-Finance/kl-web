import {PxUniqueIdentifier} from 'kl-web-common/models/pxMeta';

import {PxDataMap, PxSlotName} from '../../types/pxData';
import {StateBase} from '../types';


export const PX_DATA_STATE_NAME = 'PxData';

export enum PxDataDispatcherName {
  INIT = 'PxData/Init',
  UPDATE_COMPLETE = 'PxData/UpdateComplete',
  UPDATE_MARKET = 'PxData/UpdateMarket',
  UPDATE_SLOT_MAP = 'PxData/UpdateSlotMap',
  CLEAR_SR_LEVELS = 'PxData/ClearSrLevels'
}

export type PxSlotMap = {[name in PxSlotName]: PxUniqueIdentifier};

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
  identifiers: PxUniqueIdentifier[],
};

export type PxMarketUpdateMeta = {
  securities: string[],
};

export type PxCompleteUpdateMeta = {
  validSlotNames: PxSlotName[],
};
