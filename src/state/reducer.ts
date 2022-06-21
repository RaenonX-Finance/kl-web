import {combineReducers} from 'redux';

import customSrReducer from './customSr/reducer';
import errorReducer from './error/reducer';
import pxDataReducer from './pxData/reducer';


const reducers = {
  customSr: customSrReducer,
  error: errorReducer,
  pxData: pxDataReducer,
};

export const rootReducer = combineReducers(reducers);
