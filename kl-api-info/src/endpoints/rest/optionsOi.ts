import {HttpStatusCode} from 'axios';
import {InfoApiPath} from 'kl-web-common/enums/endpoints';
import {FastifyError, FastifyErrorSchema} from 'kl-web-common/models/api/generic/error';
import {
  OptionsOiData,
  OptionsOiDataSchema,
  OptionsOiRequest,
  OptionsOiRequestSchema,
} from 'kl-web-common/models/api/info/optionsOi';
import {dateOnlyToString} from 'kl-web-common/utils/date';

import {RestApiServer} from '../../const';
import {getOptionsOi} from '../../controllers/mongo/optionsOi';


export const restAddOptionsOiHandler = () => {
  RestApiServer.get<{Querystring: OptionsOiRequest, Reply: OptionsOiData | FastifyError}>(
    InfoApiPath.OptionsOi,
    {
      schema: {
        querystring: OptionsOiRequestSchema,
        response: {
          200: OptionsOiDataSchema,
          401: FastifyErrorSchema,
          404: FastifyErrorSchema,
        },
      },
    },
    async ({query, user}, reply) => {
      const {symbol, year, month, day, forceScrape} = query;

      if (!user.admin && forceScrape) {
        reply
          .status(HttpStatusCode.Unauthorized)
          .send({error: 'Non-admin user cannot get the Options OI data with `forceScrape`.'});
        return;
      }

      const result = await getOptionsOi({symbol, date: {year, month, day}, forceScrape});

      if (!result) {
        reply
          .status(HttpStatusCode.NotFound)
          .send({error: `No Options OI data available for ${symbol} at ${dateOnlyToString(query)}`});
        return;
      }

      return result;
    },
  );
};
