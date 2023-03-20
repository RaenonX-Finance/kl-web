import * as env from 'env-var';


export const LogDir = env.get('KL_PX_API_LOGGING_DIR').required().asString();

export const ApiHost = env.get('KL_PX_API_HOST').required().asString();

export const ApiPort = env.get('KL_PX_API_PORT_REST').required().asPortNumber();

export const GrpcPort = env.get('KL_PX_API_PORT_GRPC').required().asPortNumber();
