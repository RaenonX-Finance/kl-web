import {createSlice} from '@reduxjs/toolkit';

import {arrToMap} from '../../utils/arr';
import {mergedDispatchers} from '../aggregated/dispatchers';
import {MergedDispatcherName} from '../aggregated/types';
import {pxDataDispatchers} from '../pxData/dispatchers';
import {PxDataDispatcherName} from '../pxData/types';
import {DATA_STATE_NAME, DataState} from './types';


const initialState: DataState = {
  products: {},
  periods: {},
  lastPxUpdate: {},
};

const recordLastPxUpdateReducer = (state: DataState, securities: string[]): DataState => {
  const now = Date.now();

  return {
    ...state,
    lastPxUpdate: {
      ...state.lastPxUpdate,
      ...Object.fromEntries(securities.map((security) => [security, now])),
    },
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
      pxDataDispatchers[PxDataDispatcherName.UPDATE_MARKET].fulfilled,
      (state, {meta}) => recordLastPxUpdateReducer(state, meta.securities),
    );
    builder.addCase(
      pxDataDispatchers[PxDataDispatcherName.UPDATE_COMPLETE],
      (state, {payload}) => recordLastPxUpdateReducer(state, payload.map(({contract}) => contract.symbol)),
    );
  },
});

export default slice.reducer;
