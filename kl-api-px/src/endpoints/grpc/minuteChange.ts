import {Logger, RestApiServer} from '../../const';
import {ISystemEventServer} from '../../protos/systemEvent_grpc_pb';


export const grpcMinuteChangeHandler: ISystemEventServer['minuteChange'] = ({request}): void => {
  const epochSec = request.getEpochsec();

  if (!epochSec) {
    throw new Error('gRPC minute change - `epochSec` is undefined');
  }

  const symbols = request.getSymbolsList();

  if (!symbols.length) {
    throw new Error(`gRPC minute change - Symbols of minute change to ${new Date(epochSec * 1000)} is undefined`);
  }

  const event = 'minChange';
  Logger.info({epochSec, symbols, event}, 'Sending `%s` socket event of [%s] at %d', event, symbols, epochSec);

  RestApiServer.io.to(symbols).emit('minChange', {epochSec});
};
