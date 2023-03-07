import {PxHistorySingle} from 'kl-web-common/models/pxHistory';

import {updateEpochSecToLocal} from '../../../utils/time';


export const applyTimezoneOffsetOnBars = <T extends PxHistorySingle>(response: T): T => ({
  ...response,
  data: response.data.map((item) => ({
    ...item,
    epochSecond: updateEpochSecToLocal(item.epochSecond),
  })),
});
