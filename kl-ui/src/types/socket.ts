import {JsonValue} from '../utils/types';


export type SocketMessage = string | Uint8Array | JsonValue;

export type SocketMessageHandler = (message: SocketMessage) => void;

export type SocketEvent<E extends string> = {[key in E]: SocketMessageHandler};
