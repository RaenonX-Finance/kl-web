import {InfoSocketEmitter} from '../../types/socket';


export type WorkerTask = (emitter: InfoSocketEmitter) => PromiseLike<any>;
