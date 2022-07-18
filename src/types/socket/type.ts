import {Socket} from 'socket.io-client';


export type SocketMessage = string | Uint8Array;

export type SocketMessageHandler = (message: SocketMessage) => void;

export type SocketEventKeys =
  'init' |
  'pxUpdated' |
  'pxUpdatedMarket' |
  'pxRequest' |
  'pxInit' |
  'error' |
  'signIn' |
  'ping';

export type SocketEvent = {[key in SocketEventKeys]: SocketMessageHandler};

export type PxDataSocket = Socket<SocketEvent>;
