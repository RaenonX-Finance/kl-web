import {buildRestApi} from 'kl-api-common/init/rest/build/main';
import {registerTokenCheck} from 'kl-api-common/init/rest/build/middleware';

import {LogDir} from './env';


export const RestApiServer = buildRestApi({
  appName: 'KL.Api.Info',
  logDir: LogDir,
  afterBuild: (server) => {
    registerTokenCheck(server);
  },
});

export const Logger = RestApiServer.log;
