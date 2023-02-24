import {Logger, RestApiServer} from '../../const';
import {sioDisconnectHandler} from '../../endpoints/socket/disconnect';
import {sioErrorHandler} from '../../endpoints/socket/error';
import {sioSubscribeHandler, sioUnsubscribeHandler} from '../../endpoints/socket/subscription';


export const bindSocketEvents = () => {
  RestApiServer.io.on('connect', (serverSocket) => {
    const logObj = {session: serverSocket.id};

    // System event
    serverSocket.on('disconnect', sioDisconnectHandler(logObj.session));
    serverSocket.on('error', sioErrorHandler(logObj.session));

    // Custom event
    serverSocket.on('subscribe', sioSubscribeHandler(serverSocket));
    serverSocket.on('unsubscribe', sioUnsubscribeHandler(serverSocket));

    Logger.info(logObj, 'Socket `%s` connected', logObj.session);
  });
};
