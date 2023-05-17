import {PxLayoutConfigUI} from './type';
import {hideIfNotAdmin} from './utils';


export const layoutConfigEntries: PxLayoutConfigUI = {
  currentPxLine: {
    title: '現價水平線',
    group: '圖表',
  },
  prevDayClose: {
    title: '昨日收盤價',
    group: '圖表',
    isHidden: hideIfNotAdmin,
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
    isHidden: hideIfNotAdmin,
  },
  emaStrongSrLabel: {
    title: '趨勢控盤',
    group: '標籤',
    isDisabled: ({emaStrongSr}) => !emaStrongSr,
    isHidden: hideIfNotAdmin,
  },
  srLevelLabel: {
    title: '黃金撐壓線',
    group: '標籤',
    isDisabled: ({srLevel}) => !srLevel,
    isHidden: hideIfNotAdmin,
  },
  prevDayCloseLabel: {
    title: '昨日收盤價',
    group: '標籤',
    isHidden: hideIfNotAdmin,
  },
  inChartExtremaLabel: {
    title: '圖內高低點',
    group: '標籤',
    isHidden: hideIfNotAdmin,
  },
};
