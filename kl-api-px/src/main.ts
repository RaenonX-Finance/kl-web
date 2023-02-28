import * as dotenv from 'dotenv';


dotenv.config();

// Place before all imports to ensure the modules are instrumented by New Relic
require('newrelic');


import {Logger} from './const';
import {initMongoDataCache} from './controllers/cached/init';
import {bindGrpcCalls} from './init/grpc/calls';
import {runGrpcServiceAsync} from './init/grpc/run';
import {initRedis} from './init/redis/main';
import {bindRestEndpointHandlers} from './init/rest/endpoints';
import {bindRestEventHandlers} from './init/rest/events';
import {runFastify} from './init/rest/run';

// TODO: UI check socket event
//  - C2S Subscribe
//  - C2S Unsubscribe
//  - C2S Disconnect
//  - S2C minChange
//  - S2C market
//  - S2C request (API request send and reflected after? io.emit() send to all?)
// DRAFT: + Implement market session control (or disable for now)

(async () => {
  await Promise.all([initMongoDataCache(), initRedis()]);

  bindGrpcCalls();
  bindRestEndpointHandlers();
  bindRestEventHandlers();

  runGrpcServiceAsync();

  runFastify();
})().catch((error) => {
  Logger.error({error}, `Application start up error (%s)`, error.toString());
  process.exit(1);
});
