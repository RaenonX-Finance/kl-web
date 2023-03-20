// eslint-disable-next-line import/order
import * as dotenv from 'dotenv';


dotenv.config();

// Place before all imports to ensure the modules are instrumented by New Relic
require('newrelic');


import {runFastify} from 'kl-api-common/init/rest/run';

import {Logger, RestApiServer} from './const';
import {ApiHost, ApiPort} from './env';
import {bindRestEndpointHandlers} from './init/rest/endpoints';

// DRAFT: + Implement market session control (or disable for now)

(async () => {
  bindRestEndpointHandlers();

  await runFastify({server: RestApiServer, host: ApiHost, port: ApiPort});
})().catch((error) => {
  Logger.error({error}, `Application start up error (%s)`, error.toString());
  console.error(error);
  process.exit(1);
});
