import {UnaryHandler} from '@grpc/grpc-js/build/src/server-call';
import {nowMs} from 'kl-web-common/utils/logging';

import {GrpcService, Logger} from '../../const';
import {grpcCalculatedHandler} from '../../endpoints/grpc/calculated';
import {grpcErrorHandler} from '../../endpoints/grpc/error';
import {grpcMinuteChangeHandler} from '../../endpoints/grpc/minuteChange';
import {grpcRealtimeHandler} from '../../endpoints/grpc/realtime';
import {SystemEventService} from '../../protos/systemEvent_grpc_pb';
import {SystemEventReply} from '../../protos/systemEvent_pb';
import {PxSocketEmitter} from '../../types/socket';


let grpcRequestCount = 0;

type GrpcRequestLogObject = {
  grpc: {
    endpoint: string,
    requestCount?: number
  },
  responseTime?: number
};

const grpcHandlersAddLogging = () => {
  // @ts-ignore: Needs to access `handlers` to globally wrap the functions
  const grpcHandlers: Map<string, UnaryHandler<any, any>> = GrpcService.handlers;

  // Avoiding recursive call of `Map.get()` by creating an underlying map
  const grpcHandlersUnderlying = new Map(grpcHandlers);

  // Logging on non-existing handlers
  grpcHandlers.get = (endpoint: string) => {
    const handler = grpcHandlersUnderlying.get(endpoint);

    if (!handler) {
      const logObj: GrpcRequestLogObject = {grpc: {endpoint}};
      Logger.warn(logObj, 'gRPC request to `%s` is not implemented', logObj.grpc.endpoint);

      return undefined;
    }

    const {path, func} = handler;

    return {
      ...handler,
      func: (call, callback) => {
        const start = nowMs();

        try {
          func(call, callback);
        } catch (error) {
          Logger.error({error, endpoint}, 'Error occurred in gRPC handler of `%s`', endpoint);
          throw error;
        }

        callback(null, new SystemEventReply().setMessage('Done'));
        const logObj: GrpcRequestLogObject = {
          grpc: {endpoint: path, requestCount: grpcRequestCount++},
          responseTime: nowMs() - start,
        };
        Logger.info(logObj, 'gRPC request `%s` handled in %f ms', logObj.grpc.endpoint, logObj.responseTime);
      },
    };
  };
};

export const bindGrpcCalls = (emitter: PxSocketEmitter) => {
  GrpcService.addService(
    SystemEventService,
    {
      realtime: grpcRealtimeHandler(emitter),
      minuteChange: grpcMinuteChangeHandler(emitter),
      calculated: grpcCalculatedHandler(emitter),
      error: grpcErrorHandler(emitter),
    },
  );

  grpcHandlersAddLogging();
};
