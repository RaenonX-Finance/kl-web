import React from 'react';

import {Provider} from 'react-redux';

import {ReduxStore} from './types';


export type ReduxProviderProps = {
  reduxStore: ReduxStore,
};

export const ReduxProvider = ({
  children, reduxStore,
}: React.PropsWithChildren<ReduxProviderProps>) => (
  <Provider store={reduxStore}>
    {children}
  </Provider>
);
