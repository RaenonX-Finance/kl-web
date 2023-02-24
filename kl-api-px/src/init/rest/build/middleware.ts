import cors from '@fastify/cors';
import {FastifyInstance} from 'fastify';

import {CorsAllowedOrigins} from '../../../env';


export const registerMiddlewares = (server: FastifyInstance) => {
  const logObj = {origins: CorsAllowedOrigins};
  server.log.info(logObj, 'CORS allowed origins: %s', logObj.origins);

  server.register(
    cors,
    {
      origin: CorsAllowedOrigins,
      methods: ['GET', 'POST'],
    },
  );
  server.register(
    require('fastify-socket.io'),
    {
      cors: {
        origin: CorsAllowedOrigins,
        methods: ['GET', 'POST'],
      },
    },
  );
};
