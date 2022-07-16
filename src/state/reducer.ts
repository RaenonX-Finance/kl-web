import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import {PersistConfig} from 'redux-persist/es/types';

import configReducer from './config/reducer';
import customSrReducer from './customSr/reducer';
import errorReducer from './error/reducer';
import pxDataReducer from './pxData/reducer';
import {storage} from './storage';
import {ReduxState} from './types';


const reducers = {
  config: configReducer,
  customSr: customSrReducer,
  error: errorReducer,
  pxData: pxDataReducer,
};

const whitelist: (keyof typeof reducers)[] = [];

const persistConfig: PersistConfig<ReduxState> = {
  key: 'root',
  storage,
  whitelist,
};

export const rootReducer = combineReducers(reducers);

export const persistedReducer = persistReducer(persistConfig, rootReducer);
