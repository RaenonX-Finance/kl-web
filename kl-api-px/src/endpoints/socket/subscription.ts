import {PxSocketC2SEvents, PxSocketS2CEvents} from 'kl-web-common/models/socket/data';
import {Socket} from 'socket.io';

import {Logger} from '../../const';
import {isTokenValid} from '../../controllers/account/token';
import {identifiersToRooms} from '../../utils/socket';


export const sioSubscribeHandler = (
  socket: Socket<PxSocketC2SEvents, PxSocketS2CEvents>,
): PxSocketC2SEvents['subscribe'] => async ({
  token, identifiers,
}) => {
  const tokenErrorMessage = await isTokenValid(token);
  if (!!tokenErrorMessage) {
    socket.emit('error', `Token validation failed: ${tokenErrorMessage}`);
  }

  const rooms = identifiersToRooms(identifiers);
  socket.join(rooms);

  Logger.info({session: socket.id, rooms}, 'Socket `%s` joined [%s]', socket.id, rooms);
};


export const sioUnsubscribeHandler = (
  socket: Socket<PxSocketC2SEvents, PxSocketS2CEvents>,
): PxSocketC2SEvents['unsubscribe'] => async ({
  token, identifiers,
}) => {
  const tokenErrorMessage = await isTokenValid(token);
  if (!!tokenErrorMessage) {
    socket.emit('error', `Token validation failed: ${tokenErrorMessage}`);
  }

  const rooms = identifiersToRooms(identifiers);

  await Promise.all(rooms.map((room) => socket.leave(room)));

  Logger.info({session: socket.id, rooms}, 'Socket `%s` left [%s]', socket.id, rooms);
};
