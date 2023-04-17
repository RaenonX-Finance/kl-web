import {Socket} from 'socket.io-client';

import {AccountSocketC2SEvents, AccountSocketS2CEvents} from '../../../types/socket/account';


export type AccountSocket = Socket<AccountSocketS2CEvents, AccountSocketC2SEvents>;
