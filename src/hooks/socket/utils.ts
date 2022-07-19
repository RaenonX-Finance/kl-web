import React from 'react';

import {ActionCreatorWithPayload, AsyncThunk, ThunkDispatch} from '@reduxjs/toolkit';
import pako from 'pako';

import {ReduxState} from '../../state/types';
import {SocketMessage, SocketMessageHandler} from '../../types/socket';


type UseSocketEventHandlerOpts<R, T, A> = {
  dispatch: ThunkDispatch<ReduxState, undefined, any>,
  action: ActionCreatorWithPayload<T> | AsyncThunk<R, T, A>,
  afterAction?: () => void,
};

export const ensureStringMessage = (message: SocketMessage): string => {
  if (typeof message !== 'string') {
    message = pako.inflate(message, {to: 'string'});
  }

  return message;
};

export const useSocketEventHandler = <R, T, A>({
  dispatch,
  action,
  afterAction,
}: UseSocketEventHandlerOpts<R, T, A>): SocketMessageHandler => React.useCallback((
  message,
) => {
  const data: T = JSON.parse(ensureStringMessage(message));

  dispatch(action(data));
  if (afterAction) {
    afterAction();
  }
}, [afterAction]);
