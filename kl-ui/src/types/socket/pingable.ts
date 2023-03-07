import {Socket} from 'socket.io-client';


export type PingableSocketEvent = {
  ping: () => void,
};

export type PingableSocket = Socket<PingableSocketEvent, PingableSocketEvent>;
