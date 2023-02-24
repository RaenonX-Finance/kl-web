import {MarketPxSubscriptionData} from './marketData';
import {MinChangeData} from './minChange';
import {PxMarket} from '../pxMarket';


export type DataSocketS2CEvents = {
  market: (data: PxMarket) => void,
  minChange: (data: MinChangeData) => void,
  request: (symbols: string[]) => void,
  error: (message: string) => void,
};

export type DataSocketC2SEvents = {
  subscribe: (data: MarketPxSubscriptionData) => void,
  unsubscribe: (data: MarketPxSubscriptionData) => void,
};
