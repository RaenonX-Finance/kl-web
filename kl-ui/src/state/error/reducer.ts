import {createSlice} from '@reduxjs/toolkit';

import {errorDispatchers} from './dispatchers';
import {ERROR_STATE_NAME, ErrorDispatcherName, ErrorState} from './types';


const initialState: ErrorState = {
  message: '',
  timestamp: null,
  show: false,
};

const slice = createSlice({
  name: ERROR_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      errorDispatchers[ErrorDispatcherName.UPDATE],
      (state, {payload}) => ({
        ...state,
        show: true,
        timestamp: new Date(),
        message: payload.message,
      }),
    );
    builder.addCase(
      errorDispatchers[ErrorDispatcherName.HIDE_ERROR],
      (state) => ({
        ...state,
        show: false,
        timestamp: null,
      }),
    );
  },
});

export default slice.reducer;
