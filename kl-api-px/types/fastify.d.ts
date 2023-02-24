import {DataSocketC2SEvents, DataSocketS2CEvents} from 'kl-web-common/models/socket/socket';
import {Server} from 'socket.io';

declare module 'fastify' {
  interface FastifyInstance {
    io: Server<DataSocketC2SEvents, DataSocketS2CEvents>
  }
}
