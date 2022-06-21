import {PxDataMarket} from './pxDataMarket';


export type PxDataUniqueIdentifier = string;

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
  vwap: number,
  diff: number,
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

export type PxDataCollection = {
  [identifier: PxDataUniqueIdentifier]: PxData,
};
