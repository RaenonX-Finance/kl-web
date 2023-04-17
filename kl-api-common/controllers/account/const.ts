import * as env from 'env-var';


export const accountApiUrl = env.get('KL_API_ACCOUNT_URL').required().asString();
