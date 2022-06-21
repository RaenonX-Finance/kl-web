import {Socket} from 'socket.io-client';


export type SocketMessageHandler = (message: string) => void;

export type SocketEventKeys =
  'init' |
  'pxUpdated' |
  'pxUpdatedMarket' |
  'pxRequest' |
  'pxInit' |
  'error';

export type SocketEvent = {[key in SocketEventKeys]: SocketMessageHandler};

export type PxDataSocket = Socket<SocketEvent>;
