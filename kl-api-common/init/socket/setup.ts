import {createAdapter} from '@socket.io/redis-adapter';
import {Emitter} from '@socket.io/redis-emitter';
import {createClient} from 'redis';
import {Server} from 'socket.io';
import {EventsMap} from 'socket.io/dist/typed-events';

import {RedisDbId} from '../../enums/redisDb';


type SocketIoSetupReturn<S2CEvents extends EventsMap> = {
  emitter: Emitter<S2CEvents>
};

type SocketIoSetupOpts<S2CEvents extends EventsMap, C2SEvents extends EventsMap> = {
  database: RedisDbId,
  server: Server<C2SEvents, S2CEvents>
};

export const setupSocketIoServer = async <
  S2CEvents extends EventsMap,
  C2SEvents extends EventsMap,
>({
  database,
  server,
}: SocketIoSetupOpts<S2CEvents, C2SEvents>): Promise<SocketIoSetupReturn<S2CEvents>> => {
  const redisPubClient = createClient({database});
  const redisSubClient = redisPubClient.duplicate();
  const redisEmitterClient = redisPubClient.duplicate();

  await Promise.all([
    redisPubClient.connect(),
    redisSubClient.connect(),
    redisEmitterClient.connect(),
  ]);

  server.adapter(createAdapter(redisPubClient, redisSubClient));

  return {
    emitter: new Emitter<S2CEvents>(redisEmitterClient),
  };
};
