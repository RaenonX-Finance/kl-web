import {Emitter} from '@socket.io/redis-emitter';
import {DataSocketS2CEvents} from 'kl-web-common/models/socket/data';


export type PxSocketEmitter = Emitter<DataSocketS2CEvents>;
