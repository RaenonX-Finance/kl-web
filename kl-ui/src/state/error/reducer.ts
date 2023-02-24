import {createSlice} from '@reduxjs/toolkit';

import {errorDispatchers} from './dispatchers';
import {ERROR_STATE_NAME, ErrorDispatcherName, ErrorState} from './types';
import {ErrorMessage} from '../../types/error';


const initialState: ErrorState = {
  message: '',
  show: false,
};

const slice = createSlice({
  name: ERROR_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      errorDispatchers[ErrorDispatcherName.UPDATE],
      (state, {payload}: {payload: ErrorMessage}) => {
        state.show = true;
        state.message = payload.message;
      },
    );
    builder.addCase(
      errorDispatchers[ErrorDispatcherName.HIDE_ERROR],
      (state) => {
        state.show = false;
      },
    );
  },
});

export default slice.reducer;
