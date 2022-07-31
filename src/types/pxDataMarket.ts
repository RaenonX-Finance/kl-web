export type PxDataMarketSingle = {
  o: number,
  h: number,
  l: number,
  c: number,
  diffVal: number,
  diffPct: number,
};

export type PxDataMarket = {[security in string]: PxDataMarketSingle};
