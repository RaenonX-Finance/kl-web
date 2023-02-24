import {Logger, RestApiServer} from '../../const';
import {ISystemEventServer} from '../../protos/systemEvent_grpc_pb';


export const grpcErrorHandler: ISystemEventServer['error'] = ({request}): void => {
  const {message} = request.toObject();

  Logger.info({message}, 'Sending `error` socket event: ', message);

  RestApiServer.io.emit('error', message);
};
