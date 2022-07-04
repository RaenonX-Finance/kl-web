import React from 'react';

import {RenderResult} from '@testing-library/react';
import {User} from 'next-auth';

import {PreloadedReduxState, ReduxStore} from '../../src/state/types';


export type RenderOptions = {
  preloadState?: PreloadedReduxState,
  hasSession?: boolean,
  user?: Partial<User>,
};

export type RenderAppReturns = RenderResult & {
  rerender: (element?: React.ReactElement) => void,
  store: ReduxStore,
};
