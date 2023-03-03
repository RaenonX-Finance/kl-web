import {TypeBoxTypeProvider} from '@fastify/type-provider-typebox';
import fastify from 'fastify';
import {getEnvironment} from 'kl-web-common/utils/env';

import {envToLogger} from './loggerOpts';
import {registerCors, registerTokenCheck} from './middleware';


export const buildRestApi = () => {
  const server = fastify({logger: envToLogger[getEnvironment().toLowerCase()] ?? true})
    .withTypeProvider<TypeBoxTypeProvider>();

  registerCors(server);
  registerTokenCheck(server);

  return server;
};
