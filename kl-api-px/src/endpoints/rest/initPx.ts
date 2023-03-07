import {ApiPath} from 'kl-web-common/enums/endpoints';
import {PxInit, PxInitSchema} from 'kl-web-common/models/pxInit';
import {PxRequestBodyModel, PxRequestBodySchema} from 'kl-web-common/models/pxRequest';

import {RestApiServer} from '../../const';
import {getInitPx} from '../../controllers/mongo/pxInit';


export const restAddPxInitRequestHandler = () => {
  RestApiServer.post<{Body: PxRequestBodyModel, Reply: PxInit}>(
    ApiPath.PxInit,
    {
      schema: {
        body: PxRequestBodySchema,
        response: {
          200: PxInitSchema,
        },
      },
    },
    async (request) => {
      return await getInitPx(request.body.requests);
    },
  );
};
