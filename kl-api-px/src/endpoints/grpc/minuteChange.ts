import {Logger, RestApiServer} from '../../const';
import {ISystemEventServer} from '../../protos/systemEvent_grpc_pb';


export const grpcMinuteChangeHandler: ISystemEventServer['minuteChange'] = ({request}): void => {
  const epochSec = request.getEpochsec();

  if (!epochSec) {
    throw new Error('`epochSec` is undefined but gRPC minute change is called');
  }

  const event = 'minChange';
  Logger.info({epochSec, event}, 'Sending `%s` socket event at %d', event, epochSec);

  RestApiServer.io.emit('minChange', {epochSec});
};
