import React from 'react';

import {RenderResult} from '@testing-library/react';

import {PreloadedReduxState, ReduxStore} from '../../src/state/types';


export type RenderOptions = {
  preloadState?: PreloadedReduxState,
  hasSession?: boolean,
};

export type RenderAppReturns = RenderResult & {
  rerender: (element?: React.ReactElement) => void,
  store: ReduxStore,
};
