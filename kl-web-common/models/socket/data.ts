import {MarketPxSubscriptionData} from './marketData';
import {MinChangeData} from './minChange';
import {PxHistory} from '../api/px/pxHistory';
import {PxMarketForTransmit} from '../api/px/pxMarket';


export type PxSocketS2CEvents = {
  market: (data: PxMarketForTransmit) => void,
  minChange: (data: MinChangeData) => void,
  calculated: (data: PxHistory) => void,
  marketDateCutoff: (symbols: string[]) => void,
  error: (message: string) => void,
  ping: () => void,
};

export type PxSocketC2SEvents = {
  subscribe: (data: MarketPxSubscriptionData) => void,
  unsubscribe: (data: MarketPxSubscriptionData) => void,
  ping: () => void,
};
