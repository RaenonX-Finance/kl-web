import {StrengthIndex} from '../components/chart/pxData/legend/type';
import {PxDataMarket} from './pxDataMarket';


export type PxDataContract = {
  symbol: string,
  name: string,
  minTick: number,
};

export type PxDataBar = {
  epochSec: number,
  open: number,
  high: number,
  low: number,
  close: number,
  diff: number,
  strength: StrengthIndex | null,
};

export type PxDataSupportResistance = {
  level: number,
  strength: number,
  strengthCount: number,
  strong: boolean,
};

export type PxDataFromSocket = {
  uniqueIdentifier: string,
  periodSec: number,
  contract: PxDataContract,
  data: PxDataBar[],
  supportResistance: PxDataSupportResistance[],
  latestMarket: PxDataMarket,
};

export type PxData = PxDataFromSocket & {
  lastUpdated: number,
};

export type PxDataMapSlotNames = 'A' | 'B' | 'C' | 'D';

export type PxDataMap = {[name in PxDataMapSlotNames]: PxData | null};
