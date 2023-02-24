import {DataSocketC2SEvents, DataSocketS2CEvents} from 'kl-web-common/models/socket/socket';
import {Socket} from 'socket.io-client';


export type PxDataSocket = Socket<DataSocketS2CEvents, DataSocketC2SEvents>;
