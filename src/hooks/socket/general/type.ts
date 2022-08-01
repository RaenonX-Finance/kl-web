import {Socket} from 'socket.io-client';

import {SocketEvent} from '../../../types/socket';


export type GeneralSocketEventKeys =
  'init' |
  'error' |
  'signIn' |
  'ping' |
  'auth';

export type GeneralSocket = Socket<SocketEvent<GeneralSocketEventKeys>>;

export type PxInitMessage = {
  token: string | undefined,
  identifiers: string[],
};

export type PxCheckAuthMessage = {
  token: string | undefined,
};
