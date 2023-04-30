import {buildGrpcService} from 'kl-api-common/init/grpc/build';
import {buildRestApi} from 'kl-api-common/init/rest/build/main';
import {createClient} from 'redis';

import {RedisDbId} from './enums/redisDb';
import {LogDir} from './env';
import {buildSocketIoServer} from './init/socket/build';


export const RestApiServer = buildRestApi({
  appName: 'KL.Api.Px',
  logDir: LogDir,
});

export const SocketIoServer = buildSocketIoServer(RestApiServer.server);

export const GrpcService = buildGrpcService();

export const Logger = RestApiServer.log;

export const RedisLastPx = createClient({database: RedisDbId.LastPxAndMomentum});
