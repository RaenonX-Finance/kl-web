import {Socket} from 'socket.io-client';

import {SocketEvent} from '../../../types/socket';


export type PxSocketEventKeys =
  'updated' |
  'request' |
  'subscribe' |
  'unsubscribe';

export type PxDataSocket = Socket<SocketEvent<PxSocketEventKeys>>;

export type MarketPxSubscriptionMessage = {
  token: string | undefined,
  security: string,
};

export type RequestPxMessage = {
  token: string | undefined,
  identifier: string,
};
