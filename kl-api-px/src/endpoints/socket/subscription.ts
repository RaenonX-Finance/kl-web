import {isTokenValid} from 'kl-api-common/controllers/account/token';
import {PxSocketC2SEvents, PxSocketS2CEvents} from 'kl-web-common/models/socket/events';
import {Socket} from 'socket.io';

import {Logger} from '../../const';
import {identifiersToRooms} from '../../utils/socket';


export const sioSubscribeHandler = (
  socket: Socket<PxSocketC2SEvents, PxSocketS2CEvents>,
): PxSocketC2SEvents['subscribe'] => async ({
  token, identifiers,
}) => {
  const tokenCheckResult = await isTokenValid(Logger, token);
  if (!tokenCheckResult.ok) {
    socket.emit('error', `Token validation failed: ${tokenCheckResult.error}`);
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
  const tokenCheckResult = await isTokenValid(Logger, token);
  if (!tokenCheckResult.ok) {
    socket.emit('error', `Token validation failed: ${tokenCheckResult.error}`);
  }

  const rooms = identifiersToRooms(identifiers);

  await Promise.all(rooms.map((room) => socket.leave(room)));

  Logger.info({session: socket.id, rooms}, 'Socket `%s` left [%s]', socket.id, rooms);
};
