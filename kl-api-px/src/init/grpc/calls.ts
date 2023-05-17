import {buildGrpcService} from 'kl-api-common/init/grpc/calls';

import {GrpcService, Logger} from '../../const';
import {grpcCalculatedHandler} from '../../endpoints/grpc/calculated';
import {grpcErrorHandler} from '../../endpoints/grpc/error';
import {grpcMarketDateCutoffHandler} from '../../endpoints/grpc/marketDateCutoff';
import {grpcMinuteChangeHandler} from '../../endpoints/grpc/minuteChange';
import {grpcRealtimeHandler} from '../../endpoints/grpc/realtime';
import {SystemEventService} from '../../protos/systemEvent_grpc_pb';
import {SystemEventReply} from '../../protos/systemEvent_pb';
import {PxSocketEmitter} from '../../types/socket';


export const bindGrpcCalls = (emitter: PxSocketEmitter): Promise<void> => {
  return buildGrpcService({
    server: GrpcService,
    serviceDefinition: SystemEventService,
    handlers: {
      realtime: grpcRealtimeHandler(emitter),
      minuteChange: grpcMinuteChangeHandler(emitter),
      calculated: grpcCalculatedHandler(emitter),
      marketDateCutoff: grpcMarketDateCutoffHandler(emitter),
      error: grpcErrorHandler(emitter),
    },
    logger: Logger,
    onDone: () => new SystemEventReply().setMessage('Done'),
  });
};
