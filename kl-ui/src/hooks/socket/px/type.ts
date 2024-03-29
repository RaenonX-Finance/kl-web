import {PxSocketC2SEvents, PxSocketS2CEvents} from 'kl-web-common/models/socket/events';
import {Socket} from 'socket.io-client';


export type PxDataSocket = Socket<PxSocketS2CEvents, PxSocketC2SEvents>;
