import {ServerCredentials} from '@grpc/grpc-js';

import {GrpcService, Logger} from '../../const';
import {GrpcPort} from '../../env';


export const runGrpcServiceAsync = () => {
  return GrpcService.bindAsync(
    `localhost:${GrpcPort}`,
    ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      GrpcService.start();
      Logger.info({port}, `gRPC service listening at port %d`, port);
    },
  );
};
