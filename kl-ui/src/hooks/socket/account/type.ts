import {Socket} from 'socket.io-client';

import {AccountSocketC2SEvents, AccountSocketS2CEvents} from '../../../types/socket';


export type AccountSocket = Socket<AccountSocketS2CEvents, AccountSocketC2SEvents>;
