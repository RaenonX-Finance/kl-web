import {InfoApiPath} from 'kl-web-common/enums/endpoints';
import {
  OptionsOiData,
  OptionsOiDataSchema,
  OptionsOiRequest,
  OptionsOiRequestSchema,
} from 'kl-web-common/models/api/info/optionsOi';

import {RestApiServer} from '../../const';
import {getOptionsOi} from '../../controllers/mongo/optionsOi';


export const restAddOptionsOiHandler = () => {
  RestApiServer.get<{Querystring: OptionsOiRequest, Reply: OptionsOiData}>(
    InfoApiPath.OptionsOi,
    {
      schema: {
        querystring: OptionsOiRequestSchema,
        response: {
          200: OptionsOiDataSchema,
        },
      },
    },
    async ({query}) => {
      const {symbol, year, month, day} = query;

      return await getOptionsOi({symbol, date: {year, month, day}, forceScrape: true});
    },
  );
};
