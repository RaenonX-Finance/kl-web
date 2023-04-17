import {PxLayoutConfigUI} from './type';


export const layoutConfigEntries: PxLayoutConfigUI = {
  currentPxLine: {
    title: '現價水平線',
    group: '圖表',
  },
  inChartExtrema: {
    title: '圖內高低點',
    group: '圖表',
  },
  candlestickColor: {
    title: '紅綠量能',
    group: '指標',
  },
  tiePoint: {
    title: '多空線',
    group: '指標',
  },
  emaNet: {
    title: '趨勢濾網',
    group: '指標',
  },
  emaStrongSr: {
    title: '趨勢控盤',
    group: '指標',
  },
  srLevel: {
    title: '黃金撐壓線',
    group: '指標',
  },
  tiePointLabel: {
    title: '多空線',
    group: '標籤',
    isDisabled: ({tiePoint}) => !tiePoint,
  },
  emaNetLabel: {
    title: '趨勢濾網',
    group: '標籤',
    isDisabled: ({emaNet}) => !emaNet,
    isHidden: (user) => !user || !user.isAdmin,
  },
  emaStrongSrLabel: {
    title: '趨勢控盤',
    group: '標籤',
    isDisabled: ({emaStrongSr}) => !emaStrongSr,
    isHidden: (user) => !user || !user.isAdmin,
  },
  srLevelLabel: {
    title: '黃金撐壓線',
    group: '標籤',
    isDisabled: ({srLevel}) => !srLevel,
    isHidden: (user) => !user || !user.isAdmin,
  },
  inChartExtremaLabel: {
    title: '圖內高低點',
    group: '標籤',
  },
};
