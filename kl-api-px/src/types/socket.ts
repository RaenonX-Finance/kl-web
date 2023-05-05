import {Emitter} from '@socket.io/redis-emitter';
import {PxSocketS2CEvents} from 'kl-web-common/models/socket/events';


export type PxSocketEmitter = Emitter<PxSocketS2CEvents>;
