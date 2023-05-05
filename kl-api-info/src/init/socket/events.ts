import {sioDisconnectHandler} from 'kl-api-common/endpoints/socket/disconnect';
import {sioErrorHandler} from 'kl-api-common/endpoints/socket/error';

import {Logger, SocketIoServer} from '../../const';
import {sioSubscribeHandler, sioUnsubscribeHandler} from '../../endpoints/socket/subscriptions';


export const bindSocketEvents = () => {
  SocketIoServer.on('connect', (serverSocket) => {
    const logObj = {session: serverSocket.id};

    // Custom event
    serverSocket.on('subscribe', sioSubscribeHandler(serverSocket));
    serverSocket.on('unsubscribe', sioUnsubscribeHandler(serverSocket));

    // System event
    serverSocket.on('disconnect', sioDisconnectHandler(logObj.session, Logger));
    serverSocket.on('error', sioErrorHandler(logObj.session, Logger));

    Logger.info(logObj, 'Socket `%s` connected', logObj.session);
  });
};
