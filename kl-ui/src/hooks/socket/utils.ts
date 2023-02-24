import React from 'react';

import {ActionCreatorWithPayload, AsyncThunk, ThunkDispatch} from '@reduxjs/toolkit';
import pako from 'pako';

import {ReduxState} from '../../state/types';
import {SocketMessage, SocketMessageHandler} from '../../types/socket';

// Needs to manually create one because this type is not exported
type AsyncThunkConfig<TMeta> = {state: ReduxState, rejectValue: string, fulfilledMeta: TMeta};

type UseSocketEventHandlerOpts<
  ThunkReturn,
  ThunkArg,
  ThunkConfigMeta,
  ThunkConfig extends AsyncThunkConfig<ThunkConfigMeta>
> = {
  dispatch: ThunkDispatch<ReduxState, undefined, any>,
  action: ActionCreatorWithPayload<ThunkArg> | AsyncThunk<ThunkReturn, ThunkArg, ThunkConfig>,
  afterAction?: () => void,
};

// DRAFT: If JSON can be sent from account server and accessed directly,
//  remove the compressing impl and directly use the sent message
export const ensureStringMessage = (message: SocketMessage): string => {
  if (message instanceof ArrayBuffer) {
    return pako.inflate(message, {to: 'string'});
  } else if (typeof message === 'string') {
    return message;
  }

  return JSON.stringify(message);
};

export const useSocketEventHandler = <
  ThunkReturn,
  ThunkArg,
  ThunkConfigMeta,
  ThunkConfig extends AsyncThunkConfig<ThunkConfigMeta>
>({
  dispatch,
  action,
  afterAction,
}: UseSocketEventHandlerOpts<
    ThunkReturn,
    ThunkArg,
    ThunkConfigMeta,
    ThunkConfig
>): SocketMessageHandler => React.useCallback((
  message,
) => {
  const data: ThunkArg = JSON.parse(ensureStringMessage(message));

  dispatch(action(data));
  if (afterAction) {
    afterAction();
  }
}, [afterAction]);
