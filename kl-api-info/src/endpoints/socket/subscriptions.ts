import {InfoSocketC2SEvents, InfoSocketS2CEvents} from 'kl-web-common/models/socket/events';
import {dateOnlyToString} from 'kl-web-common/utils/date';
import {Socket} from 'socket.io';

import {Logger} from '../../const';


export const sioSubscribeHandler = (
  socket: Socket<InfoSocketC2SEvents, InfoSocketS2CEvents>,
): InfoSocketC2SEvents['subscribe'] => async (
  date,
) => {
  const room = dateOnlyToString(date);
  socket.join(room);

  Logger.info({session: socket.id, room}, 'Socket `%s` joined [%s]', socket.id, room);
};


export const sioUnsubscribeHandler = (
  socket: Socket<InfoSocketC2SEvents, InfoSocketS2CEvents>,
): InfoSocketC2SEvents['unsubscribe'] => async (
  date,
) => {
  const room = dateOnlyToString(date);
  socket.leave(room);

  Logger.info({session: socket.id, room}, 'Socket `%s` left [%s]', socket.id, room);
};
