import {AxiosResponse} from 'axios';
import {PxApiPath} from 'kl-web-common/enums/endpoints';
import {AppInitData} from 'kl-web-common/models/api/px/appInit';

import {pxApiPost} from '../common/post';


export type AppInitAppOpts = {
  token: string,
};

export const apiInitApp = ({token}: AppInitAppOpts): Promise<AxiosResponse<AppInitData>> => (
  pxApiPost({
    apiPath: PxApiPath.AppInit,
    data: {
      token,
    },
    contentType: 'application/json',
  })
);
