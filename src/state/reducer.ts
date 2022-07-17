import {combineReducers} from 'redux';

import configReducer from './config/reducer';
import customSrReducer from './customSr/reducer';
import dataReducer from './data/reducer';
import errorReducer from './error/reducer';
import pxDataReducer from './pxData/reducer';


const reducers = {
  config: configReducer,
  customSr: customSrReducer,
  data: dataReducer,
  error: errorReducer,
  pxData: pxDataReducer,
};

export const rootReducer = combineReducers(reducers);
