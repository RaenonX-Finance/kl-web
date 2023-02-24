import {DataSocketC2SEvents, DataSocketS2CEvents} from 'kl-web-common/models/socket/socket';
import {Socket} from 'socket.io';

import {Logger} from '../../const';


export const sioSubscribeHandler = (
  socket: Socket<DataSocketC2SEvents, DataSocketS2CEvents>,
): DataSocketC2SEvents['subscribe'] => async (
  data,
) => {
  // DRAFT: [Socket - subscribe] check token

  const rooms = data.identifiers.map((identifier) => identifier.split('@')[0]);
  socket.join(rooms);

  Logger.info({session: socket.id, rooms}, 'Socket `%s` joined [%s]', socket.id, rooms);
};


export const sioUnsubscribeHandler = (
  socket: Socket<DataSocketC2SEvents, DataSocketS2CEvents>,
): DataSocketC2SEvents['unsubscribe'] => async (
  data,
) => {
  // DRAFT: [Socket - unsubscribe] check token

  const rooms = data.identifiers.map((identifier) => identifier.split('@')[0]);

  await Promise.all(rooms.map(socket.leave));

  Logger.info({session: socket.id, rooms}, 'Socket `%s` left [%s]', socket.id, rooms);
};
