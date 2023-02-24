import {PxDataBar} from 'kl-web-common/models/pxDataBar';
import {PxContract} from 'kl-web-common/models/pxMeta';
import {BarsInfo, LastPriceAnimationMode, PriceFormat} from 'lightweight-charts';

import {bearColor, bullColor} from './const';
import {ColorOverridder, ExtremaPx, GetCurrentExtremaPxOptions} from './type';
import {DeepPartial} from '../../../../utils/types';


export const getAnimationMode = (enabled: boolean): LastPriceAnimationMode => (
  enabled ?
    LastPriceAnimationMode.OnDataUpdate :
    LastPriceAnimationMode.Disabled
);

export const getEmaColorOverridder = (emaPeriod: number): ColorOverridder => (bar) => {
  const barEmaValue = bar.ema[emaPeriod];

  if (!barEmaValue) {
    throw new Error(`Value of ${emaPeriod} EMA does not exist on bar`);
  }

  return bar.close > barEmaValue ? bullColor : bearColor;
};

export const getCurrentChartExtremaPx = ({chart, price, data}: GetCurrentExtremaPxOptions): ExtremaPx => {
  const visibleRange = chart.timeScale().getVisibleLogicalRange();

  if (!visibleRange) {
    throw new Error('No data in chart');
  }

  const barsInfo = price.barsInLogicalRange(visibleRange);

  if (!barsInfo) {
    throw new Error(
      'No available series data found in the requested range, ' +
      'check https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ISeriesApi#barsinlogicalrange',
    );
  }

  return getExtremaPxOfRange(barsInfo, data);
};

export const getExtremaPxOfRange = (barsInfo: BarsInfo, data: PxDataBar[]): ExtremaPx => {
  const {from, to} = barsInfo;

  if (!from || !to) {
    console.warn('Bars info does not include timestamps', barsInfo);
    return {minPx: null, maxPx: null};
  }

  const bars = data.filter(({epochSecond}) => epochSecond >= from && epochSecond <= to);

  const maxPx = Math.max(...bars.map(({high}) => high));
  const minPx = Math.min(...bars.map(({low}) => low));

  return {minPx, maxPx};
};

export const getPriceFormat = (contract: PxContract): DeepPartial<PriceFormat> => ({
  minMove: contract.minTick,
  precision: contract.decimals,
});
