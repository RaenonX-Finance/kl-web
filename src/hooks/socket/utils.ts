import React from 'react';

import {ActionCreatorWithPayload} from '@reduxjs/toolkit';

import {Dispatcher} from '../../state/types';
import {SocketMessageHandler} from '../../types/socket/type';


type UseSocketEventHandlerOpts<T> = {
  dispatch: Dispatcher,
  action: ActionCreatorWithPayload<T>,
  afterAction?: () => void,
};

export const useSocketEventHandler = <T>({
  dispatch,
  action,
  afterAction,
}: UseSocketEventHandlerOpts<T>): SocketMessageHandler => React.useCallback((
  message: string,
) => {
  const data: T = JSON.parse(message);

  dispatch(action(data));
  if (afterAction) {
    afterAction();
  }
}, [afterAction]);
