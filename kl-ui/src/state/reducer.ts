import {combineReducers} from 'redux';

import configReducer from './config/reducer';
import dataReducer from './data/reducer';
import errorReducer from './error/reducer';
import pxDataReducer from './pxData/reducer/main';


const reducers = {
  config: configReducer,
  data: dataReducer,
  error: errorReducer,
  pxData: pxDataReducer,
};

export const rootReducer = combineReducers(reducers);
