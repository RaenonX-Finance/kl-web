import {createSlice} from '@reduxjs/toolkit';

import {dataDispatchers} from './dispatchers';
import {DATA_STATE_NAME, DataDispatcherName, DataState} from './types';
import {arrToMap} from '../../utils/arr';
import {mergedDispatchers} from '../aggregated/dispatchers';
import {MergedDispatcherName} from '../aggregated/types';
import {pxDataDispatchers} from '../pxData/dispatchers';
import {PxDataDispatcherName} from '../pxData/types';


const initialState: DataState = {
  products: {},
  periods: {},
  lastPxUpdate: {},
  completePxUpdate: {},
  epochOffsetSec: 0,
};

type PxUpdateRecordOpts = {
  state: DataState,
  securities: string[],
  last: boolean,
  complete: boolean,
};

const recordPxUpdateReducer = ({state, securities, last, complete}: PxUpdateRecordOpts): DataState => {
  const now = Date.now();
  const data = Object.fromEntries(securities.map((security) => [security, now]));

  return {
    ...state,
    ...(last ? {lastPxUpdate: {...state.lastPxUpdate, ...data}} : {}),
    ...(complete ? {completePxUpdate: {...state.completePxUpdate, ...data}} : {}),
  };
};

const slice = createSlice({
  name: DATA_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      mergedDispatchers[MergedDispatcherName.INIT_APP],
      (state, {payload}) => {
        const {products, periods} = payload;

        return {
          ...state,
          products: arrToMap(products, ({symbol}) => symbol),
          periods: arrToMap(periods, ({min}) => min),
        };
      },
    );
    builder.addCase(
      pxDataDispatchers[PxDataDispatcherName.INIT],
      (state, {payload}) => (
        recordPxUpdateReducer({
          state, securities: payload.map(({symbol}) => symbol), last: true, complete: true,
        })
      ),
    );
    builder.addCase(
      pxDataDispatchers[PxDataDispatcherName.UPDATE_MARKET].fulfilled,
      (state, {meta}) => (
        recordPxUpdateReducer({
          state, securities: meta.securities, last: true, complete: false,
        })
      ),
    );
    builder.addCase(
      pxDataDispatchers[PxDataDispatcherName.UPDATE_COMPLETE].fulfilled,
      (state, {payload}) => (
        recordPxUpdateReducer({
          state, securities: payload.map(({symbol}) => symbol), last: true, complete: true,
        })
      ),
    );
    builder.addCase(
      pxDataDispatchers[PxDataDispatcherName.CLEAR_SR_LEVELS],
      (state, {payload}) => (
        recordPxUpdateReducer({
          state, securities: payload, last: true, complete: true,
        })
      ),
    );
    builder.addCase(
      dataDispatchers[DataDispatcherName.MIN_CHANGE],
      (state, {payload}) => ({
        ...state,
        epochOffsetSec: (Date.now() / 1000) - payload.epochSec,
      }),
    );
  },
});

export default slice.reducer;
