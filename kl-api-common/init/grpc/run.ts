import {Server, ServerCredentials} from '@grpc/grpc-js';
import {FastifyBaseLogger} from 'fastify';


type RunGrpcServiceAsyncOpts = {
  server: Server,
  logger: FastifyBaseLogger,
  port: number,
};

export const runGrpcService = ({server, logger, port}: RunGrpcServiceAsyncOpts) => {
  return server.bindAsync(
    `localhost:${port}`,
    ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      server.start();
      logger.info({port}, `gRPC service listening at port %d`, port);
    },
  );
};
