import {createAsyncThunk} from '@reduxjs/toolkit';

import {PxChartLayoutConfigKeys, PxChartLayoutConfigSingle} from '../../components/chart/pxData/type';
import {apiUpdateConfig, ApiUpdateConfigKeys, ApiUpdateConfigOpts} from '../../utils/api/user';
import {getErrorMessage} from '../../utils/error';
import {ReduxState} from '../types';
import {onAsyncThunkError} from '../utils';
import {defaultConfig} from './const';
import {ApiUpdateConfigCommonPayload, PxChartLayoutConfig} from './type';


export const generateInitialConfig = () : PxChartLayoutConfig => ({
  A: {...defaultConfig},
  B: {...defaultConfig},
  C: {...defaultConfig},
  D: {...defaultConfig},
});

export const getConfig = <K extends PxChartLayoutConfigKeys>(
  config: PxChartLayoutConfigSingle,
  key: K,
): PxChartLayoutConfigSingle[K] => {
  return config[key] ?? defaultConfig[key];
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
