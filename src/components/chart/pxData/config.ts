import {PxChartLayoutConfig} from './type';


export const generateInitialConfig = (): PxChartLayoutConfig => ({
  currentPxLine: {
    title: '現價水平線',
    enable: true,
    group: '圖表',
  },
  tiePointLabel: {
    title: '多空線',
    enable: true,
    group: '標籤',
    isDisabled: ({tiePoint}) => !tiePoint.enable,
  },
  emaNetLabel: {
    title: '趨勢濾網',
    enable: false,
    group: '標籤',
    isDisabled: ({emaNet}) => !emaNet.enable,
  },
  emaStrongSrLabel: {
    title: '趨勢控盤',
    enable: false,
    group: '標籤',
    isDisabled: ({emaStrongSr}) => !emaStrongSr.enable,
  },
  srLevelLabel: {
    title: '黃金撐壓線',
    enable: true,
    group: '標籤',
    isDisabled: ({srLevel}) => !srLevel.enable,
  },
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
