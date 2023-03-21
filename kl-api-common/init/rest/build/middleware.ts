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

type RequestWithToken = {
  token?: string
};

export const registerTokenCheck = (server: FastifyInstance) => {
  server.addHook<{Body: RequestWithToken | undefined, Querystring: RequestWithToken | undefined}>(
    'preHandler',
    async (req, reply) => {
      const {body, query, url} = req;

      if (!url.startsWith(ApiAuthEndpointPrefix)) {
        return;
      }

      const tokenCheckResult = await isTokenValid(server.log, body?.token || query?.token);

      if (!tokenCheckResult.ok) {
        reply
          .status(HttpStatusCode.Unauthorized)
          .send({error: tokenCheckResult.error});
        return;
      }

      req.user = tokenCheckResult;
    },
  );
};
