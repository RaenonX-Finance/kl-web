import {Socket} from 'socket.io-client';

import {SocketEvent} from '../../../types/socket';


export type PxSocketEventKeys =
  'init' |
  'pxUpdated' |
  'pxRequest' |
  'pxInit' |
  'error' |
  'signIn' |
  'ping';

export type PxDataSocket = Socket<SocketEvent<PxSocketEventKeys>>;
