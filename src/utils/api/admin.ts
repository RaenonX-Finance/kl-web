import {AxiosResponse} from 'axios';

import {AccountData} from '../../types/admin';
import {apiSendGetRequest} from './common';


export type ApiGetAccountListOpts = {
  token: string,
};

export const apiGetAccountList = ({
  token,
}: ApiGetAccountListOpts): Promise<AxiosResponse<AccountData[]>> => (
  apiSendGetRequest({
    apiPath: '/admin/accounts',
    token,
  })
);
