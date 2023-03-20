import * as http from 'http';

import {CorsAllowedOrigins} from 'kl-api-common/env';
import {Server} from 'socket.io';


export const buildSocketIoServer = (server: http.Server): Server => {
  return new Server(server, {
    transports: ['websocket', 'polling'],
    cors: {
      origin: CorsAllowedOrigins,
      methods: ['GET', 'POST'],
      // This is needed because server is load balanced: https://socket.io/docs/v4/using-multiple-nodes/
      credentials: true,
    },
  });
};
