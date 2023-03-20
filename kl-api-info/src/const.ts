import {buildRestApi} from 'kl-api-common/init/rest/build/main';

import {LogDir} from './env';


export const RestApiServer = buildRestApi({
  appName: 'KL.Api.Info',
  logDir: LogDir,
});

export const Logger = RestApiServer.log;
