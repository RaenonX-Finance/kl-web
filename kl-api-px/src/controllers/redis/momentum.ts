import {PxMomentumIndex} from 'kl-web-common/models/pxDataBar';

import {Logger, RedisLastPx} from '../../const';


export const getMomentum = async (symbol: string): Promise<PxMomentumIndex> => {
  const momentumString = await RedisLastPx.get(`${symbol}:Momentum`);

  if (!momentumString) {
    Logger.error({symbol}, 'Symbol [%s] does not momentum available', symbol);
    throw new Error(`Symbol [${symbol}] does not momentum available`);
  }

  return parseInt(momentumString) as PxMomentumIndex;
};
