import {SocketReservedEventsMap} from 'socket.io/dist/socket';

import {Logger} from '../../const';


export const sioErrorHandler = (session: string): SocketReservedEventsMap['error'] => (error) => {
  const logObj = {session, error};

  Logger.warn(logObj, 'Socket `%s` got error (%s)', logObj.session, error.toString());
};
