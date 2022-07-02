import {ISeriesApi} from 'lightweight-charts';

import {OnPxChartInitEvent} from '../../type';
import {srLevelCommonOptions, srLevelCustom, srLevelLineWidthStrong} from '../const';


export const handleSrCustom = (e: OnPxChartInitEvent, price: ISeriesApi<'Candlestick'>) => {
  const {customSrLevels} = e;

  if (!customSrLevels) {
    return;
  }

  customSrLevels.forEach(({
    level,
  }) => {
    price.createPriceLine({
      price: level,
      axisLabelVisible: true,
      color: srLevelCustom,
      ...srLevelCommonOptions,
      lineWidth: srLevelLineWidthStrong,
    });
  });
};
