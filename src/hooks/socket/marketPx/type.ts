import {Socket} from 'socket.io-client';

import {SocketEvent} from '../../../types/socket';


export type MarketPxSocketEventKeys =
  'updated' |
  'request' |
  'subscribe' |
  'unsubscribe';

export type MarketPxDataSocket = Socket<SocketEvent<MarketPxSocketEventKeys>>;

export type MarketPxSubscriptionMessage = {
  token: string | undefined,
  security: string,
};

export type RequestPxMessage = {
  token: string | undefined,
  identifier: string,
};
