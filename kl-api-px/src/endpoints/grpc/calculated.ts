import {Logger, RestApiServer} from '../../const';
import {ISystemEventServer} from '../../protos/systemEvent_grpc_pb';


export const grpcCalculatedHandler: ISystemEventServer['calculated'] = ({request}): void => {
  const {symbolsList} = request.toObject();

  const event = 'request';
  Logger.info({symbols: symbolsList, event}, 'Sending `%s` socket event of [%s]', event, symbolsList);

  RestApiServer.io.to(symbolsList).emit('request', symbolsList);
};
