import {DataSocketC2SEvents, DataSocketS2CEvents} from 'kl-web-common/models/socket/data';
import {Socket} from 'socket.io';

import {Logger} from '../../const';
import {isTokenValid} from '../../controllers/account/token';


export const sioSubscribeHandler = (
  socket: Socket<DataSocketC2SEvents, DataSocketS2CEvents>,
): DataSocketC2SEvents['subscribe'] => async (
  data,
) => {
  const tokenErrorMessage = await isTokenValid(data.token);
  if (!!tokenErrorMessage) {
    socket.emit('error', `Token validation failed: ${tokenErrorMessage}`);
  }

  const rooms = data.identifiers.map((identifier) => identifier.split('@')[0]);
  socket.join(rooms);

  Logger.info({session: socket.id, rooms}, 'Socket `%s` joined [%s]', socket.id, rooms);
};


export const sioUnsubscribeHandler = (
  socket: Socket<DataSocketC2SEvents, DataSocketS2CEvents>,
): DataSocketC2SEvents['unsubscribe'] => async (
  data,
) => {
  const tokenErrorMessage = await isTokenValid(data.token);
  if (!!tokenErrorMessage) {
    socket.emit('error', `Token validation failed: ${tokenErrorMessage}`);
  }

  const rooms = data.identifiers.map((identifier) => identifier.split('@')[0]);

  await Promise.all(rooms.map((room) => socket.leave(room)));

  Logger.info({session: socket.id, rooms}, 'Socket `%s` left [%s]', socket.id, rooms);
};
