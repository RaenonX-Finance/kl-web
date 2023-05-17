import {buildGrpcService} from 'kl-api-common/init/grpc/calls';

import {GrpcService, Logger} from '../../const';
import {grpcGetFinancialEventsHandler} from '../../endpoints/grpc/getFinancialEvents';
import {grpcGetOptionsOiHandler} from '../../endpoints/grpc/getOptionsOi';
import {PxInfoService} from '../../protos/pxInfo_grpc_pb';


export const bindGrpcCalls = (): Promise<void> => {
  return buildGrpcService({
    server: GrpcService,
    serviceDefinition: PxInfoService,
    handlers: {
      getOptionsOi: grpcGetOptionsOiHandler,
      getFinancialEvents: grpcGetFinancialEventsHandler,
    },
    logger: Logger,
  });
};
