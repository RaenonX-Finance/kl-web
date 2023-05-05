import {sioDisconnectHandler} from 'kl-api-common/endpoints/socket/disconnect';
import {sioErrorHandler} from 'kl-api-common/endpoints/socket/error';

import {Logger, SocketIoServer} from '../../const';


export const bindSocketEvents = () => {
  SocketIoServer.on('connect', (serverSocket) => {
    const logObj = {session: serverSocket.id};

    // System event
    serverSocket.on('disconnect', sioDisconnectHandler(logObj.session, Logger));
    serverSocket.on('error', sioErrorHandler(logObj.session, Logger));

    Logger.info(logObj, 'Socket `%s` connected', logObj.session);
  });
};
