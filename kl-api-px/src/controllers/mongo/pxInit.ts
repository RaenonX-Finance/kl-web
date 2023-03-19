import {PxInitApi, PxInitApiSingle} from 'kl-web-common/models/pxInit';
import {PxRequestBodyModel, PxRequestModel} from 'kl-web-common/models/pxRequest';
import {getIdentifierDetails} from 'kl-web-common/utils/pxModel';

import {getConfig, getSource} from './cached/pxConfig';
import {getSourceInfo} from './cached/sourceInfo';
import {getCalculatedPxSingle} from './pxCalc';
import {getMomentum} from '../redis/momentum';


export const getInitPxSingle = async (request: PxRequestModel): Promise<PxInitApiSingle> => {
  const {symbol, periodMin} = getIdentifierDetails(request.identifier);
  const [historySingle, momentum] = await Promise.all([getCalculatedPxSingle(request), getMomentum(symbol)]);

  // `momentum` could be 0, needs explicit comparison
  if (momentum === null) {
    return {
      request,
      data: null,
    };
  }

  const sourceInfo = getSourceInfo(symbol);
  const source = getSource(sourceInfo.symbol);
  const config = getConfig();
  const last = historySingle.data.at(-1);

  if (!last) {
    throw new Error(`Request ${JSON.stringify(request)} does not have history data available`);
  }

  return {
    request,
    data: {
      ...historySingle,
      periodSec: periodMin * 60,
      contract: {
        ...sourceInfo,
        name: source.name,
      },
      indicator: {
        ema: {
          net: config.emaNet,
          strongSr: config.emaStrongSr,
        },
      },
      latestMarket: {
        o: last.open,
        h: last.high,
        l: last.low,
        c: last.close,
        diffVal: last.diff,
        diffPct: (last.close / last.open - 1) * 100,
        momentum,
      },
    },
  };
};

export const getInitPx = async (requests: PxRequestBodyModel['requests']): Promise<PxInitApi> => {
  return await Promise.all(requests.map(getInitPxSingle));
};
