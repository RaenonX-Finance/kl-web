import {PxMomentumIndex} from 'kl-web-common/models/pxDataBar';

import {Logger, RedisLastPx} from '../../const';


export const getMomentum = async (symbol: string): Promise<PxMomentumIndex> => {
  const momentumString = await RedisLastPx.get(`Momentum:${symbol}`);

  if (!momentumString) {
    Logger.error({symbol}, 'Momentum of symbol [%s] is unavailable', symbol);
    throw new Error(`Momentum of symbol [${symbol}] is unavailable`);
  }

  return parseInt(momentumString) as PxMomentumIndex;
};
