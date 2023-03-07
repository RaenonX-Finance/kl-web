import {ISeriesApi, LastPriceAnimationMode} from 'lightweight-charts';

import {addPxLine} from './pxLine/main';
import {OnPxChartInitEvent} from '../../type';
import {pxLineColors, tiePointLabel} from '../const';


export const handleTiePoint = (e: OnPxChartInitEvent): ISeriesApi<'Line'> => {
  return addPxLine({
    ...e,
    keyOfConfig: 'tiePoint',
    keyOfConfigLabel: 'tiePointLabel',
    keyForLineData: 'tiePoint',
    title: tiePointLabel,
    color: pxLineColors.tiePoint,
    lineWidth: 2,
    lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
    priceLineVisible: false,
  });
};
