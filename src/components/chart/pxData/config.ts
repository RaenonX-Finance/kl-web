import {PxData} from '../../../types/pxData';
import {PxChartLayoutConfig} from './type';
import {makeEmaColorChangeKey} from './utils';


export const generateInitialConfig = (data: PxData): PxChartLayoutConfig => ({
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
  ...Object.fromEntries(data.indicator.ema.colorChange.map((periodPair, idx) => [
    makeEmaColorChangeKey(periodPair),
    {
      title: `趨勢控盤 ${idx + 1}`,
      enable: false,
      group: '指標',
    },
  ])),
  emaNetLine: {
    title: '趨勢濾網 (線條)',
    enable: true,
    group: '指標',
  },
  emaNet: {
    title: '趨勢濾網 (色塊)',
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
