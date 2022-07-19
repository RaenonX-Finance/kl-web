export type SocketMessage = string | Uint8Array;

export type SocketMessageHandler = (message: SocketMessage) => void;

export type SocketNamespace =
  '/' |
  '/px-market';

export type SocketEvent<K extends string> = {[key in K]: SocketMessageHandler};
