import {PxChartLayoutConfig} from './type';


export const generateInitialConfig = (): PxChartLayoutConfig => ({
  candlestickColor: {
    title: '紅綠量能',
    enable: true,
    group: '圖表',
  },
  tiePoint: {
    title: '多空線',
    enable: true,
    group: '指標',
  },
  emaNet: {
    title: '趨勢濾網',
    enable: true,
    group: '指標',
  },
  emaStrongSr: {
    title: '趨勢控盤',
    enable: true,
    group: '指標',
  },
  srLevel: {
    title: '撐壓',
    enable: true,
    group: '指標',
  },
});
