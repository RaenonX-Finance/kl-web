import {BarsInfo, LastPriceAnimationMode, PriceFormat} from 'lightweight-charts';

import {PxDataBar, PxDataContract} from '../../../../types/pxData';
import {DeepPartial} from '../../../../utils/types';
import {bearColor, bullColor} from './const';
import {ColorOverridder, ExtremaPx, GetCurrentExtremaPxOptions} from './type';


export const getAnimationMode = (enabled: boolean): LastPriceAnimationMode => (
  enabled ?
    LastPriceAnimationMode.OnDataUpdate :
    LastPriceAnimationMode.Disabled
);

export const getEmaColorOverridder = (emaPeriod: number): ColorOverridder => (bar) => {
  const barEmaValue = bar[`ema${emaPeriod}`];

  if (!barEmaValue) {
    throw Error(`Value of ${emaPeriod} EMA does not exist on bar`);
  }

  return bar.close > barEmaValue ? bullColor : bearColor;
};

export const getCurrentChartExtremaPx = ({chart, price, data}: GetCurrentExtremaPxOptions): ExtremaPx => {
  const visibleRange = chart.timeScale().getVisibleLogicalRange();

  if (!visibleRange) {
    throw Error('No data in chart');
  }

  const barsInfo = price.barsInLogicalRange(visibleRange);

  if (!barsInfo) {
    throw Error(
      'No available series data found in the requested range, ' +
      'check https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ISeriesApi#barsinlogicalrange',
    );
  }

  return getExtremaPxOfRange(barsInfo, data);
};

export const getExtremaPxOfRange = (barsInfo: BarsInfo, data: PxDataBar[]): ExtremaPx => {
  const {from, to} = barsInfo;

  if (!from || !to) {
    throw Error('Bars info does not include timestamps');
  }

  const bars = data.filter(({epochSec}) => epochSec >= from && epochSec <= to);

  const maxPx = Math.max(...bars.map(({high}) => high));
  const minPx = Math.min(...bars.map(({low}) => low));

  return {minPx, maxPx};
};

export const getPriceFormat = (contract: PxDataContract): DeepPartial<PriceFormat> => ({
  minMove: contract.minTick,
  precision: contract.decimals,
});
