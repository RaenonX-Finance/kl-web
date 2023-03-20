import {AxiosResponse} from 'axios';
import {PxApiPath} from 'kl-web-common/enums/endpoints';
import {AppInitData} from 'kl-web-common/models/appInit';

import {dataApiPost} from './common/post';


export type AppInitAppOpts = {
  token: string,
};

export const apiInitApp = ({token}: AppInitAppOpts): Promise<AxiosResponse<AppInitData>> => (
  dataApiPost({
    apiPath: PxApiPath.AppInit,
    data: {
      token,
    },
    contentType: 'application/json',
  })
);
