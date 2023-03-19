import {ApiPath} from 'kl-web-common/enums/endpoints';
import {AppInitData, AppInitDataSchema, AppInitRequest, AppInitRequestSchema} from 'kl-web-common/models/appInit';

import {RestApiServer} from '../../const';
import {getConfig} from '../../controllers/mongo/cached/pxConfig';
import {getSourceInfo} from '../../controllers/mongo/cached/sourceInfo';


export const restAddInitAppRequestHandler = () => {
  RestApiServer.post<{Body: AppInitRequest, Reply: AppInitData}>(
    ApiPath.AppInit,
    {
      schema: {
        body: AppInitRequestSchema,
        response: {
          200: AppInitDataSchema,
        },
      },
    },
    async () => {
      const {sources, periods} = getConfig();

      return {
        products: Object.values(sources)
          .filter(({enabled}) => enabled)
          .map(({internalSymbol, name}) => ({
            symbol: internalSymbol,
            name,
            sourceInfo: getSourceInfo(internalSymbol),
          })),
        periods: periods.map(({name, periodMin}) => ({name, min: periodMin})),
      };
    },
  );
};
