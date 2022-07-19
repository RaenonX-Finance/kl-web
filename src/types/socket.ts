import {GeneralSocket} from '../hooks/socket/general/type';
import {PxDataSocket} from '../hooks/socket/px/type';


export type SocketMessage = string | Uint8Array;

export type SocketMessageHandler = (message: SocketMessage) => void;

export type SocketEvent<E extends string> = {[key in E]: SocketMessageHandler};

export type SocketNamespace =
  '/' |
  '/px';

type SocketClientTypeMap = {
  '/': GeneralSocket,
  '/px': PxDataSocket,
};

export type SocketClient<N extends SocketNamespace> = SocketClientTypeMap[N];
