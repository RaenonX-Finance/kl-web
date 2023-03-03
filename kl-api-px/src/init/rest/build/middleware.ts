import {HttpStatusCode} from 'axios';
import {FastifyInstance} from 'fastify';
import {ApiAuthEndpointPrefix} from 'kl-web-common/enums/endpoints';

import {isTokenValid} from '../../../controllers/account/token';
import {CorsAllowedOrigins} from '../../../env';


export const registerCors = (server: FastifyInstance) => {
  const logObj = {origins: CorsAllowedOrigins};
  server.log.info(logObj, 'CORS allowed origins: %s', logObj.origins);

  server.register(
    require('@fastify/cors'),
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

export const registerBearerAuthCheck = (server: FastifyInstance) => {
  server.addHook<{Body: {token?: string}}>('preHandler', async ({body, routerPath}, reply) => {
    if (!routerPath.startsWith(ApiAuthEndpointPrefix)) {
      return;
    }

    const tokenCheckError = await isTokenValid(body.token);

    if (!tokenCheckError) {
      return;
    }

    reply
      .status(HttpStatusCode.Unauthorized)
      .send({error: tokenCheckError});
  });
};
