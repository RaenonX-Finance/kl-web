import * as env from 'env-var';
import {isCi} from 'kl-web-common/utils/env';


export const LogDir = env.get('KL_PX_API_LOGGING_DIR').required().asString();

export const ApiHost = env.get('KL_PX_API_HOST').required().asString();

export const ApiPort = env.get('KL_PX_API_PORT_REST').required().asPortNumber();

export const GrpcPort = env.get('KL_PX_API_PORT_GRPC').required().asPortNumber();

export const CorsAllowedOrigins = env.get('KL_PX_API_ALLOWED_ORIGINS')
  .default('')
  .required(!isCi())
  .asArray();

export const MongoUri = env.get('KL_PX_API_MONGO_URI').required().asString();
