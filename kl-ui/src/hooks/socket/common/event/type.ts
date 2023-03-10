import {EventsMap} from '@socket.io/component-emitter';
import {Socket} from 'socket.io-client';


export type UseCommonSocketEventHandlersOpts<S2C extends EventsMap, C2S extends EventsMap> = {
  name: string,
  socket: Socket<S2C, C2S> | undefined,
};

export type UseCommonSocketEventHandlersReturn = {
  onConnected: () => void,
  onConnectionError: (err: Error) => void,
  onDisconnect: (reason: Socket.DisconnectReason) => void,
};
