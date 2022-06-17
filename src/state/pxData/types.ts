import {PxData, PxDataUniqueIdentifier} from '../../types/pxData';
import {PxDataMarket} from '../../types/pxDataMarket';
import {StateBase} from '../types';


export const PX_DATA_STATE_NAME = 'PxData';

export enum PxDataDispatcherName {
  INIT = 'initPx',
  UPDATE = 'updatePx',
  UPDATE_MARKET = 'updateMarketPx',
}

export type PxDataStateEntry = PxData & {
  latestMarketData: PxDataMarket | null,
};

export type PxDataState = StateBase & {
  [identifier: PxDataUniqueIdentifier]: PxDataStateEntry,
};

export type PxDataSelectorReturn = PxDataState;
