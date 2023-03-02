import {AxiosResponse} from 'axios';
import {ApiPath} from 'kl-web-common/enums/endpoints';
import {AppInitData} from 'kl-web-common/models/appInit';

import {dataApiPost} from './common/post';


export type AppInitAppOpts = {
  token?: string,
};

export const apiInitApp = ({token}: AppInitAppOpts): Promise<AxiosResponse<AppInitData>> => (
  dataApiPost({
    apiPath: ApiPath.AppInit,
    token,
    data: {},
    contentType: 'application/json',
  })
);
