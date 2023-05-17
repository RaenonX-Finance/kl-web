import {HttpStatusCode} from 'axios';
import {InfoApiPath} from 'kl-web-common/enums/endpoints';
import {FastifyError, FastifyErrorSchema} from 'kl-web-common/models/api/generic/error';
import {
  FinancialEventData,
  FinancialEventDataSchema,
  FinancialEventsRequest,
  FinancialEventsRequestSchema,
} from 'kl-web-common/models/api/info/financialEvents';
import {dateOnlyToString} from 'kl-web-common/utils/date';

import {RestApiServer} from '../../const';
import {getFinancialEvents} from '../../controllers/mongo/financialEvents';


export const restAddFinancialEventsHandler = () => {
  RestApiServer.get<{Querystring: FinancialEventsRequest, Reply: FinancialEventData | FastifyError}>(
    InfoApiPath.FinancialEvents,
    {
      schema: {
        querystring: FinancialEventsRequestSchema,
        response: {
          200: FinancialEventDataSchema,
          401: FastifyErrorSchema,
          404: FastifyErrorSchema,
        },
      },
    },
    async ({query, user}, reply) => {
      const {year, month, day, forceScrape} = query;

      if (!user.admin && forceScrape) {
        reply
          .status(HttpStatusCode.Unauthorized)
          .send({error: 'Non-admin user cannot get the financial events with `forceScrape`.'});
        return;
      }

      const result = await getFinancialEvents({date: {year, month, day}, forceScrape});

      if (!result) {
        reply
          .status(HttpStatusCode.NotFound)
          .send({error: `No financial events available at ${dateOnlyToString(query)}`});
        return;
      }

      return result;
    },
  );
};
