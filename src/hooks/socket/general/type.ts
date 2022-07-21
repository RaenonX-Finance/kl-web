import {Socket} from 'socket.io-client';

import {SocketEvent} from '../../../types/socket';


export type GeneralSocketEventKeys =
  'init' |
  'error' |
  'signIn' |
  'ping';

export type GeneralSocket = Socket<SocketEvent<GeneralSocketEventKeys>>;

export type PxInitMessage = {
  token: string | undefined,
  identifiers: string[],
};
