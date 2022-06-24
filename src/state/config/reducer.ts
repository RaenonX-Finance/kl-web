import {createSlice} from '@reduxjs/toolkit';

import {configDispatchers} from './dispatchers';
import {CONFIG_STATE_NAME, ConfigDispatcherName, ConfigState} from './types';


const initialState: ConfigState = {
  layoutType: '1-1x1',
};

const slice = createSlice({
  name: CONFIG_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      configDispatchers[ConfigDispatcherName.UPDATE_LAYOUT],
      (state: ConfigState, {payload}) => {
        state.layoutType = payload;
      },
    );
  },
});

export default slice.reducer;
