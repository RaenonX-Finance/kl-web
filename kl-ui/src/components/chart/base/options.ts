import {ChartOptions, ColorType, CrosshairMode, DeepPartial} from 'lightweight-charts';


export const chartOptions: DeepPartial<ChartOptions> = {
  layout: {
    background: {
      type: ColorType.VerticalGradient,
      topColor: '#1e1e21',
      bottomColor: '#000000',
    },
    fontSize: 12,
    textColor: '#d5d5d5',
  },
  crosshair: {
    mode: CrosshairMode.Normal,
    horzLine: {
      labelBackgroundColor: 'rgb(60, 63, 77)',
    },
    vertLine: {
      labelBackgroundColor: 'rgb(60, 63, 77)',
    },
  },
  grid: {
    vertLines: {color: 'rgba(77, 77, 77, 0.5)'},
    horzLines: {color: 'rgba(77, 77, 77, 0.5)'},
  },
  localization: {
    dateFormat: 'yyyy-MM-dd',
  },
  timeScale: {
    timeVisible: true,
    rightOffset: 12,
  },
  handleScale: {
    axisDoubleClickReset: true,
  },
};
