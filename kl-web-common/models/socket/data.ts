import {MarketPxSubscriptionData} from './marketData';
import {MinChangeData} from './minChange';
import {PxMarket} from '../pxMarket';


export type PxSocketS2CEvents = {
  market: (data: PxMarket) => void,
  minChange: (data: MinChangeData) => void,
  request: (symbols: string[]) => void,
  marketDateCutoff: (symbols: string[]) => void,
  error: (message: string) => void,
  ping: () => void,
};

export type PxSocketC2SEvents = {
  subscribe: (data: MarketPxSubscriptionData) => void,
  unsubscribe: (data: MarketPxSubscriptionData) => void,
  ping: () => void,
};
