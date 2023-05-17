import {RedisDbId} from 'kl-api-common/enums/redisDb';
import {buildGrpcService} from 'kl-api-common/init/grpc/build';
import {buildRestApi} from 'kl-api-common/init/rest/build/main';
import {buildSocketIoServer} from 'kl-api-common/init/socket/build';
import {PxSocketC2SEvents, PxSocketS2CEvents} from 'kl-web-common/models/socket/events';
import {createClient} from 'redis';

import {LogDir} from './env';


export const RestApiServer = buildRestApi({
  appName: 'KL.Api.Px',
  logDir: LogDir,
});

export const SocketIoServer = buildSocketIoServer<PxSocketC2SEvents, PxSocketS2CEvents>(
  RestApiServer.server,
);

export const GrpcService = buildGrpcService();

export const Logger = RestApiServer.log;

export const RedisLastPx = createClient({database: RedisDbId.LastPxAndMomentum});
