import * as env from 'env-var';


export const LogDir = env.get('KL_INFO_API_LOGGING_DIR').required().asString();

export const ApiHost = env.get('KL_INFO_API_HOST').required().asString();

export const ApiPort = env.get('KL_INFO_API_PORT_REST').required().asPortNumber();

export const GrpcPort = env.get('KL_INFO_API_PORT_GRPC').required().asPortNumber();

export const OptionsOiExpirySec = env.get('KL_INFO_API_OPTION_OI_EXPIRY_SEC').required().asIntPositive();

export const FinancialEventsOnDemandExpirySec = env.get('KL_INFO_API_FIN_EVENTS_ON_DEMAND_EXPIRY_SEC')
  .required()
  .asIntPositive();
