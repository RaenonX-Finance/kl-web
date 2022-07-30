import {IChartApi, ISeriesApi, PriceLineOptions} from 'lightweight-charts';

import {PxDataBar} from '../../../../types/pxData';


export type ColorOverridder = (bar: PxDataBar) => string;

export type SrLevelCommonOptions = Omit<PriceLineOptions, 'price' | 'color' | 'axisLabelVisible'>;

export type ExtremaCommonOptions = Omit<PriceLineOptions, 'price' | 'title' | 'axisLabelVisible' | 'lineVisible'>;

export type ExtremaPx = {
  minPx: number,
  maxPx: number,
} | {
  minPx: null,
  maxPx: null,
};

export type GetCurrentExtremaPxOptions = {
  chart: IChartApi,
  data: PxDataBar[],
  price: ISeriesApi<'Candlestick'>
};
