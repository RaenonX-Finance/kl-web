import {ProductInfo, PeriodInfo} from 'kl-web-common/models/api/px/appInit';

import {StateBase} from '../types';


export const DATA_STATE_NAME = 'Data';

export enum DataDispatcherName {
  MIN_CHANGE = 'Data/MinChange',
}

export type DataState = StateBase & {
  products: {[security in string]: ProductInfo},
  periods: {[periodSec in number]: PeriodInfo},
  lastPxUpdate: {[security in string]?: number},
  completePxUpdate: {[security in string]?: number},
  epochOffsetSec: number,
};
