import {InfoSocketC2SEvents, InfoSocketS2CEvents} from 'kl-web-common/models/socket/events';
import {Socket} from 'socket.io-client';


export type InfoSocket = Socket<InfoSocketS2CEvents, InfoSocketC2SEvents>;
