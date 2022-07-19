import {Socket} from 'socket.io-client';

import {SocketEvent} from '../../../types/socket';


export type PxSocketEventKeys =
  'init' |
  'pxInit' |
  'error' |
  'signIn' |
  'ping';

export type PxDataSocket = Socket<SocketEvent<PxSocketEventKeys>>;
