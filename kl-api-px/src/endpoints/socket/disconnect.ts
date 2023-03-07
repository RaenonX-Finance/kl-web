import {SocketReservedEventsMap} from 'socket.io/dist/socket';

import {Logger} from '../../const';


export const sioDisconnectHandler = (
  session: string,
): SocketReservedEventsMap['disconnect'] => (
  reason, description,
) => {
  const logObj = {session, reason, description};

  Logger.info(logObj, 'Socket `%s` disconnected (%s)', logObj.session, reason);
};
