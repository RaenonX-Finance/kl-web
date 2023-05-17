import {runGrpcService} from 'kl-api-common/init/grpc/run';

import {GrpcService, Logger} from '../../const';
import {GrpcPort} from '../../env';


export const runGrpcServiceAsync = () => {
  return runGrpcService({
    server: GrpcService,
    logger: Logger,
    port: GrpcPort,
  });
};
