import {configureStore} from '@reduxjs/toolkit';
import {useDispatch as useReduxDispatch} from 'react-redux';

import {persistedReducer} from './reducer';
import {Dispatcher, PreloadedReduxState} from './types';


export const createStore = (preloadedState?: PreloadedReduxState) => configureStore({
  reducer: persistedReducer,
  devTools: true,
  preloadedState,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        // https://github.com/rt2zz/redux-persist/issues/988#issuecomment-654875104
        ignoredActions: ['persist/PERSIST'],
      },
    });
  },
});

export const useDispatch: () => Dispatcher = () => useReduxDispatch<Dispatcher>();
