import * as http from 'http';

import {Server} from 'socket.io';
import {EventsMap} from 'socket.io/dist/typed-events';

import {CorsAllowedOrigins} from '../../env';


export const buildSocketIoServer = <
  C2SEvents extends EventsMap,
  S2CEvents extends EventsMap
>(
  server: http.Server,
): Server<C2SEvents, S2CEvents> => {
  return new Server<C2SEvents, S2CEvents>(server, {
    transports: ['websocket', 'polling'],
    cors: {
      origin: CorsAllowedOrigins,
      methods: ['GET', 'POST'],
      // This is needed because server is load balanced: https://socket.io/docs/v4/using-multiple-nodes/
      credentials: true,
    },
  });
};
