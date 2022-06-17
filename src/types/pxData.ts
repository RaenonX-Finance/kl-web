export type PxDataUniqueIdentifier = string;

export type PxDataContract = {
  symbol: string,
  minTick: number,
};

export type PxDataBarSmaKey = `sma${number}`;

export type PxDataBar = {
  epochSec: number,
  open: number,
  high: number,
  low: number,
  close: number,
  vwap: number,
  diff: number,
} & {
  [smaKey in PxDataBarSmaKey]?: number
};

export type PxDataSupportResistance = {
  level: number,
  strength: number,
  strengthCount: number,
  strong: boolean,
};

export type PxDataSocket = {
  uniqueIdentifier: string,
  periodSec: number,
  contract: PxDataContract,
  data: PxDataBar[],
  supportResistance: PxDataSupportResistance[],
  smaPeriods: number[],
};

export type PxData = PxDataSocket & {
  lastUpdated: number,
};

export type PxDataCollection = {
  [identifier: PxDataUniqueIdentifier]: PxData,
};
