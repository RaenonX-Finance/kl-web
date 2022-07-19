import {Socket} from 'socket.io-client';

import {SocketEvent} from '../../../types/socket';


export type PxSocketEventKeys =
  'init' |
  'pxUpdated' |
  'pxUpdatedMarket' |
  'pxRequest' |
  'pxInit' |
  'error' |
  'signIn' |
  'ping';

export type PxDataSocket = Socket<SocketEvent<PxSocketEventKeys>>;
