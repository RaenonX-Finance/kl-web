import {Server} from '@grpc/grpc-js';


export const buildGrpcService = (): Server => {
  return new Server();
};
