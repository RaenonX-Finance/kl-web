import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import {HttpStatusCode} from 'axios';
import {FastifyInstance} from 'fastify';
import {isTokenValid} from 'kl-api-common/controllers/account/token';
import {ApiAuthEndpointPrefix} from 'kl-web-common/enums/endpoints';

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
    server.decorateRequest('test', new Date());

    if (!url.startsWith(ApiAuthEndpointPrefix)) {
      return;
    }

    const tokenCheckError = await isTokenValid(server.log, body.token);

    if (!tokenCheckError) {
      return;
    }

    reply
      .status(HttpStatusCode.Unauthorized)
      .send({error: tokenCheckError});
  });
};
