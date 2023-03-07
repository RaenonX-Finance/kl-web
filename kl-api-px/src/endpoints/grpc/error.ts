import {Logger} from '../../const';
import {ISystemEventServer} from '../../protos/systemEvent_grpc_pb';
import {PxSocketEmitter} from '../../types/socket';


export const grpcErrorHandler = (
  emitter: PxSocketEmitter,
): ISystemEventServer['error'] => ({
  request,
}): void => {
  const {message} = request.toObject();

  const event = 'error';
  Logger.info({message, event}, 'Sending `%s` socket event: ', event, message);

  emitter.emit('error', message);
};
