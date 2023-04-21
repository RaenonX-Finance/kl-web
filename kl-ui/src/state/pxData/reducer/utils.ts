import {createAsyncThunk} from '@reduxjs/toolkit';

import {getValidSlotNames} from '../../config/utils';
import {ReduxState} from '../../types';
import {onAsyncThunkError} from '../../utils';
import {PxCompleteUpdateMeta, PxDataDispatcherName} from '../types';


export const generateCompleteUpdateAsyncThunk = <T>(dispatcherName: PxDataDispatcherName) => {
  return createAsyncThunk<T, T, {state: ReduxState, rejectValue: string, fulfilledMeta: PxCompleteUpdateMeta}>(
    dispatcherName,
    async (payload, {getState, dispatch, rejectWithValue, fulfillWithValue}) => {
      const {config} = getState();
      const validSlotNames = getValidSlotNames(config.layoutType);

      if (!validSlotNames) {
        return onAsyncThunkError({
          message: `No valid slot names of layout type [${config.layoutType}] in [${dispatcherName}]`,
          data: null,
          rejectWithValue,
          dispatch,
        });
      }

      return fulfillWithValue(payload, {validSlotNames});
    },
  );
};
