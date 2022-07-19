import {Socket} from 'socket.io-client';

import {SocketEvent} from '../../../types/socket';


export type GeneralSocketEventKeys =
  'init' |
  'pxInit' |
  'error' |
  'signIn' |
  'ping';

export type GeneralSocket = Socket<SocketEvent<GeneralSocketEventKeys>>;
