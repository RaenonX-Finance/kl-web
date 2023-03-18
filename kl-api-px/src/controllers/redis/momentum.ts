import {PxMomentumIndex} from 'kl-web-common/models/pxDataBar';

import {RedisLastPx} from '../../const';


export const getMomentum = async (symbol: string): Promise<PxMomentumIndex | null> => {
  const momentumString = await RedisLastPx.get(`Momentum:${symbol}`);

  if (!momentumString) {
    return null;
  }

  return parseInt(momentumString) as PxMomentumIndex;
};
