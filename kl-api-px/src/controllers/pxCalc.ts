import {PxHistory, PxHistorySingle} from 'kl-web-common/models/pxHistory';
import {PxRequestBodyModel, PxRequestModel} from 'kl-web-common/models/pxRequest';

import {pxCalc} from './const';
import {DefaultRequestLimit} from './env';
import {getSrLevelBody} from './srLevel';


export const getCalculatedPxSingle = async (request: PxRequestModel): Promise<PxHistorySingle> => {
  const {offset, limit, identifier} = request;
  const [symbol, periodMinStr] = identifier.split('@');
  const periodMin = parseInt(periodMinStr);

  let cursor = pxCalc.find({symbol, periodMin}).sort('epochSecond', 'desc');

  if (offset) {
    cursor = cursor.skip(offset);
  }

  cursor = cursor.limit(limit || DefaultRequestLimit);

  const [dataArray, supportResistance] = await Promise.all([cursor.toArray(), getSrLevelBody(symbol)]);

  return {
    uniqueIdentifier: identifier,
    symbol,
    data: dataArray.reverse(),
    supportResistance,
  };
};

export const getCalculatedPx = async (requests: PxRequestBodyModel['requests']): Promise<PxHistory> => {
  return await Promise.all(requests.map(getCalculatedPxSingle));
};
