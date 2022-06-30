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
    title: '顯示全部',
    enable: true,
    group: '撐壓',
  },
  srLevelWeak: {
    title: '顯示弱撐壓',
    enable: false,
    group: '撐壓',
  },
});
