import {HttpStatusCode} from 'axios';
import {InfoApiPath} from 'kl-web-common/enums/endpoints';
import {FastifyError, FastifyErrorSchema} from 'kl-web-common/models/api/generic/error';
import {
  FinancialEventHistoryData,
  FinancialEventHistoryDataSchema,
  FinancialEventHistoryRequest,
  FinancialEventHistoryRequestSchema,
} from 'kl-web-common/models/api/info/financialEventHistory';

import {RestApiServer} from '../../const';
import {scrapeFinancialEventHistory} from '../../controllers/scraper/financialEvents/history';


export const restAddFinancialEventHistoryHandler = () => {
  RestApiServer.get<{Querystring: FinancialEventHistoryRequest, Reply: FinancialEventHistoryData | FastifyError}>(
    InfoApiPath.FinancialEventHistory,
    {
      schema: {
        querystring: FinancialEventHistoryRequestSchema,
        response: {
          200: FinancialEventHistoryDataSchema,
          401: FastifyErrorSchema,
          404: FastifyErrorSchema,
        },
      },
    },
    async ({query}, reply) => {
      const {symbol} = query;

      const result = await scrapeFinancialEventHistory({symbol});

      if (!result) {
        reply
          .status(HttpStatusCode.NotFound)
          .send({error: `No financial event history of ${symbol} available`});
        return;
      }

      return result;
    },
  );
};
