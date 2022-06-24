import {io} from 'socket.io-client';

import {PxDataSocket} from '../types/socket/type';
import {isProduction, isUsingActualData} from './env';


export const getDataUrl = (): string => {
  return isProduction() || isUsingActualData() ?
    'wss://data.kl-law.net' :
    'ws://localhost:8000';
};

export const generateSocketClient = (): PxDataSocket => {
  return io(getDataUrl(), {path: '/ws/socket.io/'});
};
