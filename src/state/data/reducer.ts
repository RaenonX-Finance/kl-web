import {createSlice} from '@reduxjs/toolkit';

import {arrToMap} from '../../utils/arr';
import {mergedDispatchers} from '../aggregated/dispatchers';
import {MergedDispatcherName} from '../aggregated/types';
import {DATA_STATE_NAME, DataState} from './types';


const initialState: DataState = {
  products: {},
  periods: {},
};

const slice = createSlice({
  name: DATA_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      mergedDispatchers[MergedDispatcherName.INIT_APP],
      (_, {payload}) => {
        const {products, periods} = payload;

        return {
          products: arrToMap(products, ({symbol}) => symbol),
          periods: arrToMap(periods, ({min}) => min),
        };
      },
    );
  },
});

export default slice.reducer;
