import {ISeriesApi} from 'lightweight-charts';

import {AddPxLineOptions} from './type';
import {getLayoutConfig} from '../../../../../../state/config/utils';
import {toLineData} from '../../../dataConvert';
import {getPriceFormat} from '../../utils';


export const addPxLine = ({
  chartRef,
  chartData,
  user,
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

  const visibleLine = getLayoutConfig({config: layoutConfig, key: keyOfConfig, user});
  const visibleLabel = getLayoutConfig({config: layoutConfig, key: keyOfConfigLabel, user});

  const series = chartRef.current.addLineSeries({
    ...props,
    title: visibleLabel ? title : '',
    priceLineVisible,
    visible: visibleLine,
    lastValueVisible: visibleLabel,
    priceFormat: getPriceFormat(chartData.contract),
  });
  series.setData(chartData.data.map(toLineData((bar) => bar[keyForLineData])));

  return series;
};
