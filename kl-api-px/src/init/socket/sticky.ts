import {createAdapter} from '@socket.io/cluster-adapter';
import {setupWorker} from '@socket.io/sticky';

import {RestApiServer} from '../../const';


export const setupSocketIoSticky = () => {
  // https://github.com/socketio/socket.io-cluster-adapter/issues/8
  // @ts-ignore
  RestApiServer.io.adapter(createAdapter());

  setupWorker(RestApiServer.io);
};
