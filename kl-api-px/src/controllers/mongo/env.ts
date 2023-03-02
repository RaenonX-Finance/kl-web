import * as env from 'env-var';


export const DefaultRequestLimit = env.get('KL_PX_REQUEST_LIMIT').required().asIntPositive();
