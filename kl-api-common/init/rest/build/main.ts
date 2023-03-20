import {TypeBoxTypeProvider} from '@fastify/type-provider-typebox';
import fastify, {FastifyInstance} from 'fastify';
import {getEnvironment} from 'kl-web-common/utils/env';

import {getLogOptions} from './loggerOpts';
import {registerMiddlewares} from './middleware';


type BuildRestApiOpts = {
  logDir: string,
  appName: string,
  afterBuild?: (server: FastifyInstance) => void,
};

export const buildRestApi = ({appName, logDir, afterBuild}: BuildRestApiOpts) => {
  const server = fastify({
    logger: getLogOptions({
      appName,
      logDir,
      environment: getEnvironment().toLowerCase(),
    }),
    trustProxy: true,
  })
    .withTypeProvider<TypeBoxTypeProvider>();

  registerMiddlewares(server);
  if (afterBuild) {
    afterBuild(server);
  }

  return server;
};
