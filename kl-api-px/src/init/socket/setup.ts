import {createAdapter} from '@socket.io/redis-adapter';
import {Emitter} from '@socket.io/redis-emitter';
import {PxSocketS2CEvents} from 'kl-web-common/models/socket/data';
import {createClient} from 'redis';

import {SocketIoServer} from '../../const';
import {RedisDbId} from '../../enums/redisDb';
import {PxSocketEmitter} from '../../types/socket';


const redisPubClient = createClient({database: RedisDbId.SocketIoCluster});
const redisSubClient = redisPubClient.duplicate();
const redisEmitterClient = redisPubClient.duplicate();

type SocketIoSetupReturn = {
  emitter: PxSocketEmitter
};

export const setupSocketIoServer = async (): Promise<SocketIoSetupReturn> => {
  await Promise.all([
    redisPubClient.connect(),
    redisSubClient.connect(),
    redisEmitterClient.connect(),
  ]);

  SocketIoServer.adapter(createAdapter(redisPubClient, redisSubClient));

  return {
    emitter: new Emitter<PxSocketS2CEvents>(redisEmitterClient),
  };
};
