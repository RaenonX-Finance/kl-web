import * as env from 'env-var';
import {isCi} from 'kl-web-common/utils/env';


export const CorsAllowedOrigins = env.get('KL_API_ALLOWED_ORIGINS')
  .default('')
  .required(!isCi())
  .asArray();

export const MongoUri = env.get('KL_API_MONGO_URI').required().asString();
