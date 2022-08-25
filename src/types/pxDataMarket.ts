import {StrengthIndex} from '../components/chart/pxData/legend/type';


export type PxDataMarketSingle = {
  o: number,
  h: number,
  l: number,
  c: number,
  diffVal: number,
  diffPct: number,
  strength: StrengthIndex,
};

export type PxDataMarket = {[security in string]: PxDataMarketSingle};
