import {Logger} from '../../const';
import {ISystemEventServer} from '../../protos/systemEvent_grpc_pb';
import {PxSocketEmitter} from '../../types/socket';


export const grpcCalculatedHandler = (
  emitter: PxSocketEmitter,
): ISystemEventServer['calculated'] => ({
  request,
}): void => {
  const {symbolsList} = request.toObject();

  const event = 'request';
  Logger.info({symbols: symbolsList, event}, 'Sending `%s` socket event of [%s]', event, symbolsList);

  emitter.to(symbolsList).emit('request', symbolsList);
};
