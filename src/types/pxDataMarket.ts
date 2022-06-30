export type PxDataMarketSingle = {
  symbol: string,
  open: number,
  high: number,
  low: number,
  close: number,
  changeVal: number,
  changePct: number,
};

export type PxDataMarket = {[security in string]: PxDataMarketSingle};
