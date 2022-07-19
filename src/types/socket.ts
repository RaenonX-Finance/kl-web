import {MarketPxDataSocket} from '../hooks/socket/marketPx/type';
import {PxDataSocket} from '../hooks/socket/px/type';


export type SocketMessage = string | Uint8Array;

export type SocketMessageHandler = (message: SocketMessage) => void;

export type SocketEvent<E extends string> = {[key in E]: SocketMessageHandler};

export type SocketNamespace =
  '/' |
  '/px-market';

type SocketClientTypeMap = {
  '/': PxDataSocket,
  '/px-market': MarketPxDataSocket,
};

export type SocketClient<N extends SocketNamespace> = SocketClientTypeMap[N];
