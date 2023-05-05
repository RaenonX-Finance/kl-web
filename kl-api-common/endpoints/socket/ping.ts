import {FastifyBaseLogger} from 'fastify';
import {PingableSocketEventMap} from 'kl-web-common/models/socket/events';
import {Socket} from 'socket.io';


export const sioPingHandler = (
  socket: Socket<PingableSocketEventMap, PingableSocketEventMap>,
  logger: FastifyBaseLogger,
): PingableSocketEventMap['ping'] => () => {
  socket.emit('ping');

  const event = 'ping';
  const session = socket.id;

  logger.info({event, session}, 'Received `%s` socket event from `%s`', event, session);
};
