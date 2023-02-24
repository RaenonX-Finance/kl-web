import {Logger, RestApiServer} from '../../const';
import {ISystemEventServer} from '../../protos/systemEvent_grpc_pb';


export const grpcMinuteChangeHandler: ISystemEventServer['minuteChange'] = ({request}): void => {
  const epochSec = request.getEpochsec();

  Logger.info({epochSec}, 'Sending `minChange` socket event at %d', epochSec);

  if (!epochSec) {
    throw new Error('`epochSec` is undefined but gRPC minute change is called');
  }

  RestApiServer.io.emit('minChange', {epochSec});
};
