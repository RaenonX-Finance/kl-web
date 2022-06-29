import {ISeriesApi, LastPriceAnimationMode} from 'lightweight-charts';

import {OnPxChartInitEvent} from '../../type';
import {pxLineColors} from '../const';
import {addPxLine} from './pxLine/main';


export const handleTiePoint = (e: OnPxChartInitEvent): ISeriesApi<'Line'> => {
  return addPxLine({
    ...e,
    keyOfConfig: 'tiePoint',
    keyForLineData: 'tiePoint',
    title: 'L/S',
    color: pxLineColors.tiePoint,
    lineWidth: 1,
    lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
    priceLineVisible: false,
  });
};
