import {Server, ServiceDefinition, UntypedHandleCall, UntypedServiceImplementation} from '@grpc/grpc-js';
import {FastifyBaseLogger} from 'fastify';
import {nowMs} from 'kl-web-common/utils/logging';


let grpcRequestCount = 0;

type GrpcRequestLogObject = {
  grpc: {
    endpoint: string,
    requestCount: number
  },
  responseTime: number
};

type BuildGrpcServiceOpts<S extends ServiceDefinition> = {
  server: Server,
  serviceDefinition: S,
  handlers: UntypedServiceImplementation,
  logger: FastifyBaseLogger,
  onDone?: () => any,
};

export const buildGrpcService = async <S extends ServiceDefinition>({
  server,
  serviceDefinition,
  handlers,
  logger,
  onDone,
}: BuildGrpcServiceOpts<S>) => {
  server.addService(
    serviceDefinition,
    Object.fromEntries(await Promise.all(Object.entries(handlers).map(async ([endpoint, handler]) => {
      const wrappedHandler: UntypedHandleCall = async (call: any) => {
        const start = nowMs();

        try {
          await handler(call, () => void 0);
        } catch (error) {
          logger.error({error, endpoint}, 'Error occurred in gRPC handler of `%s`', endpoint);
          throw error;
        }

        if (onDone) {
          onDone();
        }

        const logObj: GrpcRequestLogObject = {
          grpc: {endpoint, requestCount: grpcRequestCount++},
          responseTime: nowMs() - start,
        };
        logger.info(logObj, 'gRPC request `%s` handled in %f ms', logObj.grpc.endpoint, logObj.responseTime);
      };

      return [endpoint, wrappedHandler];
    }))),
  );
};
