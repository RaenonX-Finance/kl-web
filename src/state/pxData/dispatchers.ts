import {createAction} from '@reduxjs/toolkit';

import {PxDataFromSocket} from '../../types/pxData';
import {PxDataMarket} from '../../types/pxDataMarket';
import {PxDataDispatcherName, PxDataSlotMap, PxDataUpdateChartMap} from './types';


export const pxDataDispatchers = {
  [PxDataDispatcherName.INIT]: createAction<PxDataFromSocket[]>(PxDataDispatcherName.INIT),
  [PxDataDispatcherName.INIT_SLOT_MAP]: createAction<PxDataSlotMap>(PxDataDispatcherName.INIT_SLOT_MAP),
  [PxDataDispatcherName.UPDATE]: createAction<PxDataFromSocket[]>(PxDataDispatcherName.UPDATE),
  [PxDataDispatcherName.UPDATE_MARKET]: createAction<PxDataMarket>(PxDataDispatcherName.UPDATE_MARKET),
  [PxDataDispatcherName.UPDATE_CHART_MAP]: createAction<PxDataUpdateChartMap>(PxDataDispatcherName.UPDATE_CHART_MAP),
};
