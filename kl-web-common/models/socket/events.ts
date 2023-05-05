import {MarketPxSubscriptionData} from './marketData';
import {MinChangeData} from './minChange';
import {FinancialEventData} from '../api/info/financialEvents';
import {PxHistory} from '../api/px/pxHistory';
import {PxMarketForTransmit} from '../api/px/pxMarket';
import {DateOnly} from '../dateOnly';


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

export type InfoSocketC2SEvents = {
  subscribe: (date: DateOnly) => void,
  unsubscribe: (date: DateOnly) => void,
};

export type InfoSocketS2CEvents = {
  eventUpdated: (data: FinancialEventData) => void,
  latestUpdated: (data: FinancialEventData) => void,
};
