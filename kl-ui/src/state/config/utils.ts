import {createAsyncThunk} from '@reduxjs/toolkit';
import {User} from 'next-auth';

import {defaultLayoutConfig, defaultSharedConfig} from './const';
import {ApiUpdateConfigCommonPayload, PxLayoutConfig} from './type';
import {layoutConfigEntries} from '../../components/chart/config/layout/const';
import {PxLayoutConfigKeys, PxLayoutConfigSingle} from '../../components/chart/config/layout/type';
import {PxSharedConfig} from '../../components/chart/config/shared/type';
import {LayoutType} from '../../components/chart/layoutSelector/type';
import {PxSlotName} from '../../types/pxData';
import {apiUpdateConfig, ApiUpdateConfigKeys, ApiUpdateConfigOpts} from '../../utils/api/user';
import {getErrorMessage} from '../../utils/error';
import {layoutCountToSlotNames} from '../pxData/utils';
import {ReduxState} from '../types';
import {onAsyncThunkError} from '../utils';


export const generateLayoutConfig = () : PxLayoutConfig => ({
  A: {...defaultLayoutConfig},
  B: {...defaultLayoutConfig},
  C: {...defaultLayoutConfig},
  D: {...defaultLayoutConfig},
});

export const generateSharedConfig = () : PxSharedConfig => ({...defaultSharedConfig});

type GetLayoutConfigOpts<K extends PxLayoutConfigKeys> = {
  config: PxLayoutConfigSingle,
  key: K,
  user: User | undefined
};

export const getLayoutConfig = <K extends PxLayoutConfigKeys>({
  config,
  key,
  user,
}: GetLayoutConfigOpts<K>): PxLayoutConfigSingle[K] => {
  const isHiddenCheck = layoutConfigEntries[key].isHidden;
  if (isHiddenCheck && isHiddenCheck(user)) {
    return false;
  }

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

export const getLayoutCount = (layoutType: LayoutType | null): number | null => {
  const layoutCount = layoutType?.split('-')[0];

  return layoutCount ? parseInt(layoutCount) : null;
};

export const getValidSlotNames = (layoutType: LayoutType | null): PxSlotName[] | null => {
  const layoutCount = getLayoutCount(layoutType);

  if (!layoutCount) {
    return null;
  }

  const validSlotNames = layoutCountToSlotNames[layoutCount];
  if (!validSlotNames) {
    console.error(`Unhandled layout count ${layoutCount} of layout type ${layoutType}`);
    return null;
  }

  return validSlotNames;
};
