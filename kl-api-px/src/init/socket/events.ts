import {sioDisconnectHandler} from 'kl-api-common/endpoints/socket/disconnect';
import {sioErrorHandler} from 'kl-api-common/endpoints/socket/error';

import {Logger, SocketIoServer} from '../../const';
import {sioPingHandler} from '../../endpoints/socket/ping';
import {sioSubscribeHandler, sioUnsubscribeHandler} from '../../endpoints/socket/subscription';


export const bindSocketEvents = () => {
  SocketIoServer.on('connect', (serverSocket) => {
    const logObj = {session: serverSocket.id};

    // System event
    serverSocket.on('disconnect', sioDisconnectHandler(logObj.session, Logger));
    serverSocket.on('error', sioErrorHandler(logObj.session, Logger));

    // Custom event
    serverSocket.on('subscribe', sioSubscribeHandler(serverSocket));
    serverSocket.on('unsubscribe', sioUnsubscribeHandler(serverSocket));
    serverSocket.on('ping', sioPingHandler(serverSocket));

    Logger.info(logObj, 'Socket `%s` connected', logObj.session);
  });
};
