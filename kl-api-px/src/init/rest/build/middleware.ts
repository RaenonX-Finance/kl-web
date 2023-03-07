import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import {HttpStatusCode} from 'axios';
import {FastifyInstance} from 'fastify';
import {ApiAuthEndpointPrefix} from 'kl-web-common/enums/endpoints';

import {isTokenValid} from '../../../controllers/account/token';
import {CorsAllowedOrigins} from '../../../env';


export const registerMiddlewares = (server: FastifyInstance) => {
  const logObj = {origins: CorsAllowedOrigins};
  server.log.info(logObj, 'CORS allowed origins: %s', logObj.origins);

  server.register(fastifyHelmet);
  server.register(
    fastifyCors,
    {
      origin: CorsAllowedOrigins,
      methods: ['GET', 'POST'],
    },
  );
};

export const registerTokenCheck = (server: FastifyInstance) => {
  server.addHook<{Body: {token?: string}}>('preHandler', async ({body, url}, reply) => {
    if (!url.startsWith(ApiAuthEndpointPrefix)) {
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
