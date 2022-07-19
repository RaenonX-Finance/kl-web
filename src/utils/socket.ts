import {io} from 'socket.io-client';

import {PxDataSocket} from '../hooks/socket/px/type';
import {SocketNamespace} from '../types/socket';
import {isProduction, isUsingActualData} from './env';


export const getDataUrl = (namespace: SocketNamespace = '/'): string => {
  return isProduction() || isUsingActualData() ?
    `wss://data.kl-law.net${namespace}` :
    `ws://localhost:8000${namespace}`;
};

export const generateSocketClient = (namespace: SocketNamespace = '/'): PxDataSocket => {
  return io(getDataUrl(namespace), {path: '/ws/socket.io/'});
};
