import * as dotenv from 'dotenv';


dotenv.config();

// Place before all imports to ensure the modules are instrumented by New Relic
require('newrelic');


import {Logger} from './const';
import {initMongoDataCache} from './controllers/mongo/cached/init';
import {bindGrpcCalls} from './init/grpc/calls';
import {runGrpcServiceAsync} from './init/grpc/run';
import {initRedis} from './init/redis/main';
import {bindRestEndpointHandlers} from './init/rest/endpoints';
import {addFastifyHooks} from './init/rest/hooks';
import {runFastify} from './init/rest/run';
import {bindSocketEvents} from './init/socket/events';
import {setupSocketIoServer} from './init/socket/setup';

// DRAFT: + Implement market session control (or disable for now)

(async () => {
  await Promise.all([initMongoDataCache(), initRedis()]);

  const {emitter} = await setupSocketIoServer();

  bindGrpcCalls(emitter);
  bindRestEndpointHandlers();
  bindSocketEvents();

  addFastifyHooks();

  runGrpcServiceAsync();
  await runFastify();
})().catch((error) => {
  Logger.error({error}, `Application start up error (%s)`, error.toString());
  console.error(error);
  process.exit(1);
});
