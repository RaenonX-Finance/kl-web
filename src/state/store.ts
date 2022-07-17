import {configureStore} from '@reduxjs/toolkit';
import {useDispatch as useReduxDispatch} from 'react-redux';

import {rootReducer} from './reducer';
import {Dispatcher, PreloadedReduxState} from './types';


export const createStore = (preloadedState?: PreloadedReduxState) => configureStore({
  reducer: rootReducer,
  devTools: true,
  preloadedState,
});

export const useDispatch = (): Dispatcher => useReduxDispatch<Dispatcher>();
