import path from 'path';

import {FastifyLoggerOptions, FastifyServerOptions} from 'fastify';
// eslint-disable-next-line import/no-unresolved
import {PinoLoggerOptions} from 'fastify/types/logger';
import {getEnvironment} from 'kl-web-common/utils/env';
import {TransportTargetOptions} from 'pino';

import {LogDir} from '../../../env';


// `transport` for `pino-pretty` disables the `file` option of `fastify` in logger options
const pinoFileTransport: TransportTargetOptions = {
  level: 'info',
  target: 'pino/file',
  options: {
    destination: path.join(LogDir, `KL.Api.Px.${getEnvironment()}.log`),
    mkdir: true,
  },
};

const commonOptions: FastifyLoggerOptions & PinoLoggerOptions = {
  ...require('@newrelic/pino-enricher')(),
  formatters: {
    log: (context) => {
      // Add `application` to logging context for easier log searching on NR1
      context.application = context['entity.name'];

      // Copied from `@newrelic/pino-enricher` because `formatters` is overridden by the above patch
      if (context.err) {
        const err = context.err as {name: string, message: string, stack: string};

        context['error.message'] = err.message;
        context['error.stack'] = err.stack;
        context['error.class'] = err.name === 'Error' ? context.err.constructor.name : err.name;
        delete context.err;
      }
      return context;
    },
  },
};

export const envToLogger: {[environment in string]?: FastifyServerOptions['logger']} = {
  development: {
    transport: {
      targets: [
        pinoFileTransport,
        {
          level: 'info',
          target: 'pino-pretty',
          options: {
            translateTime: 'yyyy-mm-dd HH:MM:ss Z',
          },
        },
      ],
    },
    ...commonOptions,
  },
  production: {
    transport: pinoFileTransport,
    ...commonOptions,
  },
  test: false,
};
