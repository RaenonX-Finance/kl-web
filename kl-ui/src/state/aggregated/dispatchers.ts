import {createAction} from '@reduxjs/toolkit';
import {AppInitData} from 'kl-web-common/models/appInit';

import {MergedDispatcherName} from './types';
import {InitAccountData} from '../../types/init';


export const mergedDispatchers = {
  [MergedDispatcherName.INIT_ACCOUNT]: createAction<InitAccountData>(MergedDispatcherName.INIT_ACCOUNT),
  [MergedDispatcherName.INIT_APP]: createAction<AppInitData>(MergedDispatcherName.INIT_APP),
};
