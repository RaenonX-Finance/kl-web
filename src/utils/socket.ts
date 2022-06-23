import {io} from 'socket.io-client';

import {PxDataSocket} from '../types/socket/type';


export const getDataUrl = (): string => {
  return process.env.NODE_ENV === 'production' || !!process.env.NEXT_PUBLIC_DATA_SOURCE_ACTUAL ?
    'wss://data.kl-law.net' :
    'ws://localhost:8000';
};

export const generateSocketClient = (): PxDataSocket => {
  return io(getDataUrl(), {path: '/ws/socket.io/'});
};
