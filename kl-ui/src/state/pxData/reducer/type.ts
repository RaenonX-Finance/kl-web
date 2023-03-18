import {PxHistorySingle} from 'kl-web-common/models/pxHistory';
import {PxUniqueIdentifier} from 'kl-web-common/models/pxMeta';


export type PxStateUpdatePayload<T extends PxHistorySingle> = {
  identifier: PxUniqueIdentifier,
  data: T | null,
};
