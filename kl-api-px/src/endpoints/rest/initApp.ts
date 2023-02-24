import {ApiPath} from 'kl-web-common/enums/endpoints';
import {AppInitData, AppInitDataSchema, AppInitRequest} from 'kl-web-common/models/appInit';

import {RestApiServer} from '../../const';
import {getConfig} from '../../controllers/cached/pxConfig';


export const restAddInitAppRequestHandler = () => {
  RestApiServer.post<{Body: AppInitRequest, Reply: AppInitData}>(
    ApiPath.AppInit,
    {
      schema: {
        response: {
          200: AppInitDataSchema,
        },
      },
    },
    async () => {
      // DRAFT: [ApiPath.AppInit] Check token here
      const {sources, periods} = getConfig();

      return {
        products: sources.map(({internalSymbol, name}) => ({symbol: internalSymbol, name})),
        periods: periods.map(({name, periodMin}) => ({name, min: periodMin})),
      };
    },
  );
};
