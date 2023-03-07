import * as env from 'env-var';


export const accountApiUrl = env.get('KL_PX_ACCOUNT_API_URL').required().asString();
