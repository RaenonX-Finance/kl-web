import React from 'react';

import {render} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';

import {ReduxProvider} from '../../src/state/provider';
import {createStore} from '../../src/state/store';
import {ReduxStore} from '../../src/state/types';
import {RenderOptions, RenderAppReturns} from './types';


type WrapperProps = {
  store: ReduxStore,
  options?: RenderOptions,
};

const RenderWrapper = ({store, children}: React.PropsWithChildren<WrapperProps>) => {
  return (
    <ReduxProvider persist={false} reduxStore={store}>
      {children}
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
