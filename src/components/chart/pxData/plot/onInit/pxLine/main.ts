import {ISeriesApi} from 'lightweight-charts';

import {getLayoutConfig} from '../../../../../../state/config/utils';
import {toLineData} from '../../../dataConvert';
import {getPriceFormat} from '../../utils';
import {AddPxLineOptions} from './type';


export const addPxLine = ({
  chartRef,
  chartDataRef,
  layoutConfig,
  keyOfConfig,
  keyOfConfigLabel,
  keyForLineData,
  priceLineVisible,
  title,
  ...props
}: AddPxLineOptions): ISeriesApi<'Line'> => {
  if (!chartRef.current) {
    throw new Error(`Adding ${title} while the chart is not ready`);
  }

  const visibleLine = getLayoutConfig(layoutConfig, keyOfConfig);
  const visibleLabel = getLayoutConfig(layoutConfig, keyOfConfigLabel);

  const series = chartRef.current.addLineSeries({
    ...props,
    title: visibleLabel ? title : '',
    priceLineVisible,
    visible: visibleLine,
    lastValueVisible: visibleLabel,
    priceFormat: getPriceFormat(chartDataRef.current.contract),
  });
  series.setData(chartDataRef.current.data.map(toLineData(keyForLineData)));

  return series;
};
