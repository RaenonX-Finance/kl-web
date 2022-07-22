import {createAsyncThunk} from '@reduxjs/toolkit';

import {PxLayoutConfigKeys, PxLayoutConfigSingle} from '../../components/chart/pxData/type';
import {apiUpdateConfig, ApiUpdateConfigKeys, ApiUpdateConfigOpts} from '../../utils/api/user';
import {getErrorMessage} from '../../utils/error';
import {ReduxState} from '../types';
import {onAsyncThunkError} from '../utils';
import {defaultLayoutConfig} from './const';
import {ApiUpdateConfigCommonPayload, PxLayoutConfig} from './type';


export const generateLayoutConfig = () : PxLayoutConfig => ({
  A: {...defaultLayoutConfig},
  B: {...defaultLayoutConfig},
  C: {...defaultLayoutConfig},
  D: {...defaultLayoutConfig},
});

export const getLayoutConfig = <K extends PxLayoutConfigKeys>(
  config: PxLayoutConfigSingle,
  key: K,
): PxLayoutConfigSingle[K] => {
  return config[key] ?? defaultLayoutConfig[key];
};

type CreateConfigAsyncThunkReturn<K extends ApiUpdateConfigKeys, P> = {
  data: ApiUpdateConfigOpts<K>['data'],
  payload: P
};

type CreateConfigAsyncThunkOpts<
  T extends ApiUpdateConfigCommonPayload,
  K extends ApiUpdateConfigKeys,
  P,
> = {
  actionName: string,
  key: K,
  getData: (state: ReduxState, payload: T) => ApiUpdateConfigOpts<K>['data'],
  getPayload: (payload: T) => P,
};

export const createConfigAsyncThunk = <
  T extends ApiUpdateConfigCommonPayload,
  K extends ApiUpdateConfigKeys,
  P = any,
>({
  actionName,
  key,
  getData,
  getPayload,
}: CreateConfigAsyncThunkOpts<T, K, P>) => createAsyncThunk<
  CreateConfigAsyncThunkReturn<K, P>,
  T,
  {state: ReduxState, rejectValue: string}
>(
  actionName,
  async (payload, {getState, dispatch, rejectWithValue}) => {
    const {token} = payload;
    const data = getData(getState(), payload);

    if (!data) {
      return onAsyncThunkError({
        message: `Attempt to update with config key [${key}] while the config is not ready.`,
        data,
        rejectWithValue,
        dispatch,
      });
    } else if (!token) {
      return onAsyncThunkError({
        message: `Config [${key}] cannot update - token is falsy: ${token}`,
        data,
        rejectWithValue,
        dispatch,
      });
    }

    try {
      await apiUpdateConfig({token, key, data});
    } catch (err) {
      return onAsyncThunkError({
        message: getErrorMessage({err}),
        data,
        rejectWithValue,
        dispatch,
      });
    }

    return {data, payload: getPayload(payload)};
  },
);
