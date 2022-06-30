import {PxChartLayoutConfig} from './type';


export const generateInitialConfig = (): PxChartLayoutConfig => ({
  candlestickColor: {
    title: '紅綠量能',
    enable: false,
    group: '指標',
  },
  tiePoint: {
    title: '多空線',
    enable: false,
    group: '指標',
  },
  emaNet: {
    title: '趨勢濾網',
    enable: false,
    group: '指標',
  },
  emaStrongSr: {
    title: '趨勢控盤',
    enable: false,
    group: '指標',
  },
  srLevel: {
    title: '黃金撐壓線',
    enable: false,
    group: '指標',
  },
});
