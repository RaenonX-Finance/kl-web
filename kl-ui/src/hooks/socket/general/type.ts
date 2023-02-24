import {Socket} from 'socket.io-client';

import {SocketEvent} from '../../../types/socket';


export type GeneralSocketEventKeys =
  'init' |
  'error' |
  'signIn' |
  'ping' |
  'auth';

export type GeneralSocket = Socket<SocketEvent<GeneralSocketEventKeys>>;

export type PxCheckAuthMessage = {
  token: string | undefined,
};
