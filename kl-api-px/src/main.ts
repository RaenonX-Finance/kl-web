// eslint-disable-next-line import/order
import * as dotenv from 'dotenv';


dotenv.config();

// Place before all imports to ensure the modules are instrumented by New Relic
require('newrelic');


import {RedisDbId} from 'kl-api-common/enums/redisDb';
import {runFastify} from 'kl-api-common/init/rest/run';
import {setupSocketIoServer} from 'kl-api-common/init/socket/setup';

import {Logger, RestApiServer, SocketIoServer} from './const';
import {initMongoDataCache} from './controllers/mongo/cached/init';
import {ApiHost, ApiPort} from './env';
import {bindGrpcCalls} from './init/grpc/calls';
import {runGrpcServiceAsync} from './init/grpc/run';
import {initRedis} from './init/redis/main';
import {bindRestEndpointHandlers} from './init/rest/endpoints';
import {addFastifyHooks} from './init/rest/hooks';
import {bindSocketEvents} from './init/socket/events';

// DRAFT: + Implement market session control (or disable for now)

(async () => {
  await Promise.all([initMongoDataCache(), initRedis()]);

  const {emitter} = await setupSocketIoServer({
    database: RedisDbId.SocketIoPxApiCluster,
    server: SocketIoServer,
  });

  await bindGrpcCalls(emitter);
  bindRestEndpointHandlers();
  bindSocketEvents();

  addFastifyHooks();

  runGrpcServiceAsync();
  await runFastify({server: RestApiServer, host: ApiHost, port: ApiPort});
})().catch((error) => {
  Logger.error({error}, `Application start up error (%s)`, error.toString());
  console.error(error);
  process.exit(1);
});
