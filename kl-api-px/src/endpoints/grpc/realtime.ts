import {PxMomentumIndex} from 'kl-web-common/models/pxDataBar';
import {PxMarket, PxMarketSingle} from 'kl-web-common/models/pxMarket';

import {Logger, RestApiServer} from '../../const';
import {ISystemEventServer} from '../../protos/systemEvent_grpc_pb';
import {RealtimeDataSingle} from '../../protos/systemEvent_pb';
import {decimalValueToNumber} from '../../utils/grpcDecimalValue';


export const getDecimalValue = (
  symbol: string, obj: RealtimeDataSingle.AsObject | undefined, key: keyof RealtimeDataSingle.AsObject,
): number => {
  if (!obj) {
    Logger.error({symbol, obj, key}, `Failed to get the decimal value of [%s].[%s]`, symbol, key);
    throw new Error(`Failed to get the decimal value of [${symbol}].[${key}]`);
  }

  const decimalValue = obj[key];

  if (!decimalValue) {
    Logger.error({symbol, obj, key}, `[%s].[%s] of object is undefined`, symbol, key);
    throw new Error(`[${symbol}].[${key}] of object is undefined`);
  }
  if (typeof decimalValue === 'number') {
    Logger.error({symbol, obj, key, value: decimalValue}, `Value of [%s].[%s] is a number`, symbol, key);
    throw new Error(`Failed to get the decimal value of [${symbol}].${key}`);
  }

  return decimalValueToNumber(decimalValue);
};

export const grpcRealtimeHandler: ISystemEventServer['realtime'] = ({request}): void => {
  const {dataMap} = request.toObject();
  const symbols = dataMap.map(([symbol]) => symbol);

  const event = 'market';
  Logger.info({symbols, event}, 'Sending `%s` socket event of [%s]', event, symbols);

  const pxMarket: PxMarket = Object.fromEntries(dataMap.map((([symbol, obj]) => {
    const pxMarketSingle: PxMarketSingle = {
      o: getDecimalValue(symbol, obj, 'open'),
      h: getDecimalValue(symbol, obj, 'high'),
      l: getDecimalValue(symbol, obj, 'low'),
      c: getDecimalValue(symbol, obj, 'close'),
      diffVal: getDecimalValue(symbol, obj, 'diffval'),
      diffPct: getDecimalValue(symbol, obj, 'diffpct'),
      momentum: obj.momentum as PxMomentumIndex,
    };

    return [symbol, pxMarketSingle];
  })));

  RestApiServer.io.to(symbols).emit('market', pxMarket);
};
