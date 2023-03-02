import {ApiPath} from 'kl-web-common/enums/endpoints';
import {PxHistory, PxHistorySchema} from 'kl-web-common/models/pxHistory';
import {PxRequestBodyModel, PxRequestBodySchema} from 'kl-web-common/models/pxRequest';

import {RestApiServer} from '../../const';
import {getCalculatedPx} from '../../controllers/mongo/pxCalc';


export const restAddPxRequestHandler = () => {
  RestApiServer.post<{Body: PxRequestBodyModel, Reply: PxHistory}>(
    ApiPath.PxRequest,
    {
      schema: {
        body: PxRequestBodySchema,
        response: {
          200: PxHistorySchema,
        },
      },
    },
    async (request) => {
      // DRAFT: [ApiPath.PxRequest] Check token here

      return await getCalculatedPx(request.body.requests);
    },
  );
};
