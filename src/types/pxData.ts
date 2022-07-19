import {StrengthIndex} from '../components/chart/pxData/legend/type';
import {PxDataMarket} from './pxDataMarket';


export type PxDataCandlestickDirection = 1 | -1;

export type PxDataBarEmaKey = `ema${number}`;

export type PxDataBar = {
  epochSec: number,
  open: number,
  high: number,
  low: number,
  close: number,
  diff: number,
  strength: StrengthIndex | null,
  candlestick: PxDataCandlestickDirection,
  tiePoint: number,
} & {
  [emaKey in PxDataBarEmaKey]?: number
};

export type PxDataSupportResistance = {
  groups: number[][],
  basic: number[],
};

export type PxDataContract = {
  symbol: string,
  name: string,
  minTick: number,
};

export type PxDataEmaPeriodPair = {
  fast: number,
  slow: number,
};

export type PxDataEmaConfig = {
  net: PxDataEmaPeriodPair,
  strongSr: PxDataEmaPeriodPair[],
};

export type PxDataIndicatorConfig = {
  ema: PxDataEmaConfig,
};

export type PxDataFromSocket = {
  uniqueIdentifier: string,
  periodSec: number,
  contract: PxDataContract,
  data: PxDataBar[],
  supportResistance: PxDataSupportResistance,
  latestMarket: PxDataMarket,
  indicator: PxDataIndicatorConfig,
};

export type PxData = PxDataFromSocket & {
  lastUpdated: number,
};

export type PxSlotName = 'A' | 'B' | 'C' | 'D';

export type PxDataMap = {[name in PxSlotName]: PxData | null};
