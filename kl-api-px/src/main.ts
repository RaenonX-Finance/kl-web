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
import {bindRestEventHandlers} from './init/rest/events';
import {runFastify} from './init/rest/run';
import {setupSocketIoSticky} from './init/socket/sticky';

// DRAFT: + Implement market session control (or disable for now)

(async () => {
  await Promise.all([initMongoDataCache(), initRedis()]);

  setupSocketIoSticky();

  bindGrpcCalls();
  bindRestEndpointHandlers();
  bindRestEventHandlers();

  runGrpcServiceAsync();

  await runFastify();
})().catch((error) => {
  Logger.error({error}, `Application start up error (%s)`, error.toString());
  process.exit(1);
});
