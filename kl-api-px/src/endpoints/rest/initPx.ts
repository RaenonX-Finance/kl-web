import {PxApiPath} from 'kl-web-common/enums/endpoints';
import {PxInitApi, PxInitApiSchema} from 'kl-web-common/models/api/px/pxInit';
import {PxRequestBodyModel, PxRequestBodySchema} from 'kl-web-common/models/api/px/pxRequest';

import {RestApiServer} from '../../const';
import {getInitPx} from '../../controllers/mongo/pxInit';


export const restAddPxInitRequestHandler = () => {
  RestApiServer.post<{Body: PxRequestBodyModel, Reply: PxInitApi}>(
    PxApiPath.PxInit,
    {
      schema: {
        body: PxRequestBodySchema,
        response: {
          200: PxInitApiSchema,
        },
      },
    },
    async (request) => {
      return await getInitPx(request.body.requests);
    },
  );
};
