import React from 'react';

import {render} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';
import {Session} from 'next-auth';
import {SessionProvider} from 'next-auth/react';

import {ReduxProvider} from '../../src/state/provider';
import {createStore} from '../../src/state/store';
import {ReduxStore} from '../../src/state/types';
import {RenderAppReturns, RenderOptions} from './types';


type WrapperProps = {
  store: ReduxStore,
  options?: RenderOptions,
};

const RenderWrapper = ({store, options, children}: React.PropsWithChildren<WrapperProps>) => {
  const session: Session = {
    expires: '99999999999',
    user: {
      id: '62c21575105753e238b0f2b5',
      username: 'username',
      email: 'email@example.com',
      isAdmin: false,
      expiry: new Date(),
      permissions: ['chart:view'],
      ...options?.user,
    },
  };

  return (
    // Should have the same provider wrapping as what is in `_app.tsx`
    <ReduxProvider persist={false} reduxStore={store}>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </ReduxProvider>
  );
};

export const renderReactHook = <T, >(
  callback: (...params: any[]) => T,
  options?: RenderOptions,
) => {
  const store = createStore(options?.preloadState);

  return renderHook(
    callback,
    {
      wrapper: RenderWrapper,
      initialProps: {options, store},
    },
  );
};

export const renderReact = (
  getReactElement: () => React.ReactElement,
  options?: RenderOptions,
): RenderAppReturns => {
  const store = createStore(options?.preloadState);

  const app = render(
    <RenderWrapper options={options} store={store}>
      {getReactElement()}
    </RenderWrapper>,
  );

  const rerender = () => {
    app.rerender(
      <RenderWrapper options={options} store={store}>
        {getReactElement()}
      </RenderWrapper>,
    );
  };

  return {...app, rerender, store};
};
