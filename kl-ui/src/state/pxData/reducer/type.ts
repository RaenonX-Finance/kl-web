import {PxHistorySingle} from 'kl-web-common/models/api/px/pxHistory';
import {PxUniqueIdentifier} from 'kl-web-common/models/api/px/pxMeta';


export type PxStateUpdatePayload<T extends PxHistorySingle> = {
  identifier: PxUniqueIdentifier,
  data: T | null,
};
