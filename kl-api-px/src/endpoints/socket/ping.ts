import {PxSocketC2SEvents, PxSocketS2CEvents} from 'kl-web-common/models/socket/data';
import {Socket} from 'socket.io';

import {Logger} from '../../const';


export const sioPingHandler = (
  socket: Socket<PxSocketC2SEvents, PxSocketS2CEvents>,
): PxSocketC2SEvents['ping'] => () => {
  socket.emit('ping');

  const event = 'ping';
  const session = socket.id;

  Logger.info({event, session}, 'Received `%s` socket event from `%s`', event, session);
};
