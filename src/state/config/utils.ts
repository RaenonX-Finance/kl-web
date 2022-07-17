import {createAsyncThunk} from '@reduxjs/toolkit';

import {PxChartLayoutConfigKeys} from '../../components/chart/pxData/type';
import {apiUpdateConfig, ApiUpdateConfigKeys, ApiUpdateConfigOpts} from '../../utils/api/user';
import {getErrorMessage} from '../../utils/error';
import {ReduxState} from '../types';
import {onAsyncThunkError} from '../utils';
import {defaultConfig} from './const';
import {PxChartLayoutConfig, PxChartLayoutConfigSingle} from './types';


export const generateInitialConfig = () : PxChartLayoutConfig => ({
  A: {...defaultConfig},
  B: {...defaultConfig},
  C: {...defaultConfig},
  D: {...defaultConfig},
});

export const getConfig = (config: PxChartLayoutConfigSingle, key: PxChartLayoutConfigKeys): boolean => {
  return config[key] ?? defaultConfig[key];
};

type CreateConfigAsyncThunkOpts<T, K extends ApiUpdateConfigKeys> = {
  actionName: string,
  key: K,
  getData: (state: ReduxState) => ApiUpdateConfigOpts<K>['data'] | null | undefined,
  getToken: (payload: T) => string | null | undefined,
};

export const createConfigAsyncThunk = <T, K extends ApiUpdateConfigKeys>({
  actionName,
  key,
  getData,
  getToken,
}: CreateConfigAsyncThunkOpts<T, K>) => createAsyncThunk<T, T, {state: ReduxState, rejectValue: string}>(
  actionName,
  async (payload, {getState, dispatch, rejectWithValue}) => {
    const token = getToken(payload);
    const data = getData(getState());

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

    return payload;
  },
);
