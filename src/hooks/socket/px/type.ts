import {Socket} from 'socket.io-client';

import {SocketEvent} from '../../../types/socket';


export type PxSocketEventKeys =
  'pxInit' |
  'updated' |
  'request' |
  'subscribe' |
  'unsubscribe';

export type PxDataSocket = Socket<SocketEvent<PxSocketEventKeys>>;

export type MarketPxSubscriptionMessage = {
  token: string | undefined,
  securities: string[],
};

export type RequestPxMessageSingle = {
  identifier: string,
  offset: number | null,
};

export type RequestPxMessage = {
  token: string | undefined,
  requests: RequestPxMessageSingle[],
};
