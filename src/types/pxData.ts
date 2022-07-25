import {StrengthIndex} from '../components/chart/pxData/legend/type';
import {PxDataMarketSingle} from './pxDataMarket';


export type PxDataCandlestickDirection = 1 | 0 | -1;

export type PxDataBarEmaKey = `ema${number}`;

export type PxDataUniqueIdentifier = `${string}@${number}`;

export type PxDataBar = {
  epochSec: number,
  open: number,
  high: number,
  low: number,
  close: number,
  diff: number,
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
  decimals: number,
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

export type PxData = {
  uniqueIdentifier: PxDataUniqueIdentifier,
  periodSec: number,
  contract: PxDataContract,
  data: PxDataBar[],
  strength: StrengthIndex,
  supportResistance: PxDataSupportResistance,
  latestMarket: PxDataMarketSingle,
  indicator: PxDataIndicatorConfig,
};

export type PxSlotName = 'A' | 'B' | 'C' | 'D';

export type PxDataMap = {[name in PxSlotName]: PxData | null};
