import {io} from 'socket.io-client';

import {AccountSocket} from '../hooks/socket/account/type';
import {InfoSocket} from '../hooks/socket/info/type';
import {PxDataSocket} from '../hooks/socket/px/type';


export const generatePxSocketClient = (): PxDataSocket => {
  const url = process.env.NEXT_PUBLIC_PX_SOCKET_URL;

  if (!url) {
    throw new Error('Px socket URL not set.');
  }

  // `withCredentials` is needed because Px socket is load balanced: https://socket.io/docs/v4/using-multiple-nodes/
  return io(
    url,
    {
      path: '/socket.io/',
      withCredentials: true,
      transports: ['websocket', 'polling'],
    },
  );
};

export const generateInfoSocketClient = (): InfoSocket => {
  const url = process.env.NEXT_PUBLIC_INFO_SOCKET_URL;

  if (!url) {
    throw new Error('Info socket URL not set.');
  }

  // `withCredentials` is needed because info socket is load balanced: https://socket.io/docs/v4/using-multiple-nodes/
  return io(
    url,
    {
      path: '/socket.io/',
      withCredentials: true,
      transports: ['websocket', 'polling'],
    },
  );
};

export const generateAccountSocketClient = (): AccountSocket => {
  const url = process.env.NEXT_PUBLIC_ACCOUNT_SOCKET_URL;

  if (!url) {
    throw new Error('Account socket URL not set.');
  }

  return io(url, {path: '/ws/socket.io/'});
};
