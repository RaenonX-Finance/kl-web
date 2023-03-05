import {Logger, RestApiServer} from '../../const';
import {ISystemEventServer} from '../../protos/systemEvent_grpc_pb';


export const grpcErrorHandler: ISystemEventServer['error'] = ({request}): void => {
  const {message} = request.toObject();

  const event = 'error';
  Logger.info({message, event}, 'Sending `%s` socket event: ', event, message);

  RestApiServer.io.emit('error', message);
};
