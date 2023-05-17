import {buildGrpcService} from 'kl-api-common/init/grpc/build';
import {buildRestApi} from 'kl-api-common/init/rest/build/main';
import {registerTokenCheck} from 'kl-api-common/init/rest/build/middleware';
import {buildSocketIoServer} from 'kl-api-common/init/socket/build';
import {InfoSocketC2SEvents, InfoSocketS2CEvents} from 'kl-web-common/models/socket/events';

import {LogDir} from './env';


export const RestApiServer = buildRestApi({
  appName: 'KL.Api.Info',
  logDir: LogDir,
  afterBuild: (server) => {
    registerTokenCheck(server);
  },
});

export const SocketIoServer = buildSocketIoServer<InfoSocketC2SEvents, InfoSocketS2CEvents>(RestApiServer.server);

export const Logger = RestApiServer.log;

export const GrpcService = buildGrpcService();
