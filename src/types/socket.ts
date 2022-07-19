import {GeneralSocket} from '../hooks/socket/general/type';
import {PxDataSocket} from '../hooks/socket/px/type';
import {JsonValue} from '../utils/types';


export type SocketMessage = string | Uint8Array | JsonValue;

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
