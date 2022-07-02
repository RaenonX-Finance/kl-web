import {OnPxChartInitEvent} from '../../type';
import {handleCrosshairMove} from './crosshairMove';
import {handleXrangeChange} from './xRangeChange';


export const handleChartEvent = (e: OnPxChartInitEvent) => {
  const {chartRef} = e;

  if (!chartRef.current) {
    throw new Error('Legend to be handled while the chart is not ready');
  }

  chartRef.current.timeScale().subscribeVisibleLogicalRangeChange(handleXrangeChange(e));
  chartRef.current.subscribeCrosshairMove(handleCrosshairMove(e));
};
