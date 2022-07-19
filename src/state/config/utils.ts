import {createAsyncThunk} from '@reduxjs/toolkit';

import {PxChartLayoutConfigKeys} from '../../components/chart/pxData/type';
import {apiUpdateConfig, ApiUpdateConfigKeys, ApiUpdateConfigOpts} from '../../utils/api/user';
import {getErrorMessage} from '../../utils/error';
import {ReduxState} from '../types';
import {onAsyncThunkError} from '../utils';
import {defaultConfig} from './const';
import {ApiUpdateConfigCommonPayload, PxChartLayoutConfig, PxChartLayoutConfigSingle} from './types';


export const generateInitialConfig = () : PxChartLayoutConfig => ({
  A: {...defaultConfig},
  B: {...defaultConfig},
  C: {...defaultConfig},
  D: {...defaultConfig},
});

export const getConfig = (config: PxChartLayoutConfigSingle, key: PxChartLayoutConfigKeys): boolean => {
  return config[key] ?? defaultConfig[key];
};

type CreateConfigAsyncThunkOpts<
  R extends ApiUpdateConfigOpts<K>['data'],
  T extends ApiUpdateConfigCommonPayload,
  K extends ApiUpdateConfigKeys
> = {
  actionName: string,
  key: K,
  getData: (state: ReduxState, payload: T) => R,
};

export const createConfigAsyncThunk = <
  T extends ApiUpdateConfigCommonPayload,
  K extends ApiUpdateConfigKeys
>({
  actionName,
  key,
  getData,
}: CreateConfigAsyncThunkOpts<ApiUpdateConfigOpts<K>['data'], T, K>) => createAsyncThunk<
  ApiUpdateConfigOpts<K>['data'],
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

    return data;
  },
);
