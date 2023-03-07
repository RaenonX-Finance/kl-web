import {ApiPath} from 'kl-web-common/enums/endpoints';
import {AppInitData, AppInitDataSchema, AppInitRequest} from 'kl-web-common/models/appInit';

import {RestApiServer} from '../../const';
import {getConfig} from '../../controllers/mongo/cached/pxConfig';


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
      const {sources, periods} = getConfig();

      return {
        products: sources
          .filter(({enabled}) => enabled)
          .map(({internalSymbol, name}) => ({symbol: internalSymbol, name})),
        periods: periods.map(({name, periodMin}) => ({name, min: periodMin})),
      };
    },
  );
};
