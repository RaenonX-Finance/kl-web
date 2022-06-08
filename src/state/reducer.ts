import {combineReducers} from 'redux';

import customSrReducer from './customSr/reducer';
import errorReducer from './error/reducer';
import pxDataReducer from './pxData/reducer';


const reducers = {
  pxData: pxDataReducer,
  customSr: customSrReducer,
  error: errorReducer,
};

export const rootReducer = combineReducers(reducers);
