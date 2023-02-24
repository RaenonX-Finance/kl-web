import {io} from 'socket.io-client';

import {GeneralSocket} from '../hooks/socket/general/type';
import {PxDataSocket} from '../hooks/socket/px/type';


export const generateDataSocketClient = (): PxDataSocket => {
  const url = process.env.NEXT_PUBLIC_DATA_SOCKET_URL;

  if (!url) {
    throw new Error('Data socket URL not set.');
  }

  return io(url, {path: '/ws/socket.io/'});
};

export const generateAccountSocketClient = (): GeneralSocket => {
  const url = process.env.NEXT_PUBLIC_ACCOUNT_SOCKET_URL;

  if (!url) {
    throw new Error('Account socket URL not set.');
  }

  return io(process.env.NEXT_PUBLIC_ACCOUNT_SOCKET_URL as string, {path: '/ws/socket.io/'});
};
