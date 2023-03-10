import {Logger} from '../../const';
import {ISystemEventServer} from '../../protos/systemEvent_grpc_pb';
import {PxSocketEmitter} from '../../types/socket';


export const grpcMarketDateCutoffHandler = (
  emitter: PxSocketEmitter,
): ISystemEventServer['marketDateCutoff'] => ({
  request,
}): void => {
  const symbols = request.getSymbolsList();

  const event = 'marketDateCutoff';
  Logger.info({symbols, event}, 'Sending `%s` socket event of [%s]', event, symbols);

  emitter.to(symbols).emit('marketDateCutoff', symbols);
};
