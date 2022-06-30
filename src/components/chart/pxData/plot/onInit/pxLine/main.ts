import {ISeriesApi} from 'lightweight-charts';

import {toLineData} from '../../../dataConvert';
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

  const visibleLine = layoutConfig[keyOfConfig].enable;
  const visibleLabel = layoutConfig[keyOfConfigLabel].enable;

  const series = chartRef.current.addLineSeries({
    ...props,
    title: visibleLabel ? title : '',
    priceLineVisible,
    visible: visibleLine,
    lastValueVisible: visibleLabel,
  });
  series.setData(chartDataRef.current.data.map(toLineData(keyForLineData)));

  return series;
};
