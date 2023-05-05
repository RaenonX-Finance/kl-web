import {MarketPxSubscriptionData} from './marketData';
import {MinChangeData} from './minChange';
import {FinancialEventData} from '../api/info/financialEvents';
import {PxHistory} from '../api/px/pxHistory';
import {PxMarketForTransmit} from '../api/px/pxMarket';
import {DateOnly} from '../dateOnly';


export type PingableSocketEventMap = {
  ping: () => void,
};

export type PxSocketS2CEvents = PingableSocketEventMap & {
  market: (data: PxMarketForTransmit) => void,
  minChange: (data: MinChangeData) => void,
  calculated: (data: PxHistory) => void,
  marketDateCutoff: (symbols: string[]) => void,
  error: (message: string) => void,
};

export type PxSocketC2SEvents = PingableSocketEventMap & {
  subscribe: (data: MarketPxSubscriptionData) => void,
  unsubscribe: (data: MarketPxSubscriptionData) => void,
};

export type InfoSocketC2SEvents = PingableSocketEventMap & {
  subscribe: (date: DateOnly) => void,
  unsubscribe: (date: DateOnly) => void,
};

export type InfoSocketS2CEvents = PingableSocketEventMap & {
  eventUpdated: (data: FinancialEventData) => void,
  latestUpdated: (data: FinancialEventData) => void,
};
