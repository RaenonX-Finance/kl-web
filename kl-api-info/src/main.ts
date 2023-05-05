// eslint-disable-next-line import/order
import * as dotenv from 'dotenv';


dotenv.config();

// Place before all imports to ensure the modules are instrumented by New Relic
require('newrelic');


import {RedisDbId} from 'kl-api-common/enums/redisDb';
import {runFastify} from 'kl-api-common/init/rest/run';
import {setupSocketIoServer} from 'kl-api-common/init/socket/setup';

import {Logger, SocketIoServer, RestApiServer} from './const';
import {initMongoDb} from './controllers/mongo/init';
import {ApiHost, ApiPort} from './env';
import {bindGrpcCalls} from './init/grpc/calls';
import {runGrpcServiceAsync} from './init/grpc/run';
import {bindRestEndpointHandlers} from './init/rest/endpoints';
import {bindSocketEvents} from './init/socket/events';
import {scheduleWorker} from './init/worker/main';

// DRAFT: + Implement market session control (or disable for now)

(async () => {
  await initMongoDb();

  const {emitter} = await setupSocketIoServer({
    database: RedisDbId.SocketIoInfoApiCluster,
    server: SocketIoServer,
  });

  await bindGrpcCalls();
  bindRestEndpointHandlers();
  bindSocketEvents();

  scheduleWorker(emitter);

  runGrpcServiceAsync();
  await runFastify({server: RestApiServer, host: ApiHost, port: ApiPort});
})().catch((error) => {
  Logger.error({error}, `Application start up error (%s)`, error.toString());
  console.error(error);
  process.exit(1);
});
