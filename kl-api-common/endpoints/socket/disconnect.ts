import {FastifyBaseLogger} from 'fastify';
import {SocketReservedEventsMap} from 'socket.io/dist/socket';


export const sioDisconnectHandler = (
  session: string,
  logger: FastifyBaseLogger,
): SocketReservedEventsMap['disconnect'] => (
  reason,
  description,
) => {
  const logObj = {session, reason, description};

  logger.info(logObj, 'Socket `%s` disconnected (%s)', logObj.session, reason);
};
