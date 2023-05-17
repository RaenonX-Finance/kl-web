import {Emitter} from '@socket.io/redis-emitter';
import {InfoSocketS2CEvents} from 'kl-web-common/models/socket/events';


export type InfoSocketEmitter = Emitter<InfoSocketS2CEvents>;
