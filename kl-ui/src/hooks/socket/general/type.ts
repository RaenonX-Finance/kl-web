import {Socket} from 'socket.io-client';

import {GeneralSocketC2SEvents, GeneralSocketS2CEvents} from '../../../types/socket';


export type GeneralSocket = Socket<GeneralSocketS2CEvents, GeneralSocketC2SEvents>;
