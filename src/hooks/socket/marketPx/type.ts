import {Socket} from 'socket.io-client';

import {SocketEvent} from '../../../types/socket';


export type MarketPxSocketEventKeys =
  'updated' |
  'subscribe' |
  'unsubscribe';

export type MarketPxDataSocket = Socket<SocketEvent<MarketPxSocketEventKeys>>;

export type MarketPxSubscriptionMessage = {
  token: string | undefined,
  security: string,
};
