import {FastifyBaseLogger} from 'fastify';
import {SocketReservedEventsMap} from 'socket.io/dist/socket';


export const sioErrorHandler = (
  session: string,
  logger: FastifyBaseLogger,
): SocketReservedEventsMap['error'] => (
  error,
) => {
  const logObj = {session, error};

  logger.warn(logObj, 'Socket `%s` got error (%s)', logObj.session, error.toString());
};
