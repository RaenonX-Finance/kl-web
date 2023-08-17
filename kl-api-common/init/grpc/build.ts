import {Server} from '@grpc/grpc-js';

import {GrpcMaxConnectionAgeMs} from '../../env';


export const buildGrpcService = (): Server => {
  return new Server({
    'grpc.max_connection_age_ms': GrpcMaxConnectionAgeMs,
    'grpc.max_connection_age_grace_ms': 3000,
  });
};
