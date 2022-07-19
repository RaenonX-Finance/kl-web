import React from 'react';

import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import pako from 'pako';

import {Dispatcher} from '../../state/types';
import {SocketMessage, SocketMessageHandler} from '../../types/socket';


type UseSocketEventHandlerOpts<T> = {
  dispatch: Dispatcher,
  action: ActionCreatorWithPayload<T>,
  afterAction?: () => void,
};

export const ensureStringMessage = (message: SocketMessage): string => {
  if (typeof message !== 'string') {
    message = pako.inflate(message, {to: 'string'});
  }

  return message;
};

export const useSocketEventHandler = <T>({
  dispatch,
  action,
  afterAction,
}: UseSocketEventHandlerOpts<T>): SocketMessageHandler => React.useCallback((
  message,
) => {
  const data: T = JSON.parse(ensureStringMessage(message));

  dispatch(action(data));
  if (afterAction) {
    afterAction();
  }
}, [afterAction]);
