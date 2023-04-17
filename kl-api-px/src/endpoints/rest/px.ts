import {PxApiPath} from 'kl-web-common/enums/endpoints';
import {PxHistory, PxHistorySchema} from 'kl-web-common/models/api/px/pxHistory';
import {PxRequestBodyModel, PxRequestBodySchema} from 'kl-web-common/models/api/px/pxRequest';

import {RestApiServer} from '../../const';
import {getCalculatedPx} from '../../controllers/mongo/pxCalc';


export const restAddPxRequestHandler = () => {
  RestApiServer.post<{Body: PxRequestBodyModel, Reply: PxHistory}>(
    PxApiPath.PxRequest,
    {
      schema: {
        body: PxRequestBodySchema,
        response: {
          200: PxHistorySchema,
        },
      },
    },
    async (request) => {
      return await getCalculatedPx(request.body.requests);
    },
  );
};
