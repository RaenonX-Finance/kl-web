import {createSlice} from '@reduxjs/toolkit';

import {mergedDispatchers} from '../aggregated/dispatchers';
import {MergedDispatcherName} from '../aggregated/types';
import {CustomSrLevelState, SR_CUSTOM_STATE_NAME} from './types';


const initialState: CustomSrLevelState = {};

const slice = createSlice({
  name: SR_CUSTOM_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      mergedDispatchers[MergedDispatcherName.INIT_APP],
      (_, {payload}) => payload.customSrLevelDict,
    );
  },
});

export default slice.reducer;
