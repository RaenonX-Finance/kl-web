import {Logger, RestApiServer} from '../../const';
import {ISystemEventServer} from '../../protos/systemEvent_grpc_pb';


export const grpcCalculatedHandler: ISystemEventServer['calculated'] = ({request}): void => {
  const {symbolsList} = request.toObject();

  Logger.info({symbols: symbolsList}, 'Sending `request` socket event of [%s]', symbolsList);

  RestApiServer.io.to(symbolsList).emit('request', symbolsList);
};
