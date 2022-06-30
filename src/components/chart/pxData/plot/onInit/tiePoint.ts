import {ISeriesApi, LastPriceAnimationMode} from 'lightweight-charts';

import {OnPxChartInitEvent} from '../../type';
import {pxLineColors, tiePointLabel} from '../const';
import {addPxLine} from './pxLine/main';


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
