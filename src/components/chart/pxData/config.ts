import {PxLayoutConfigUI} from './type';


export const configEntriesUI: PxLayoutConfigUI = {
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
  srLevelBasic: {
    title: '基礎撐壓線',
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
  },
  emaStrongSrLabel: {
    title: '趨勢控盤',
    group: '標籤',
    isDisabled: ({emaStrongSr}) => !emaStrongSr,
  },
  srLevelLabel: {
    title: '黃金撐壓線',
    group: '標籤',
    isDisabled: ({srLevel}) => !srLevel,
  },
  srLevelBasicLabel: {
    title: '基礎撐壓線',
    group: '標籤',
    isDisabled: ({srLevelBasic}) => !srLevelBasic,
  },
  inChartExtremaLabel: {
    title: '圖內高低點',
    group: '標籤',
    isDisabled: ({inChartExtrema}) => !inChartExtrema,
  },
  intervalMarketPxSec: {
    title: '行情刷新頻率 (秒)',
    group: '其他',
    step: 0.05,
    min: 0.1,
    tips: '秒數越低，系統資源消耗量越大；報價更新頻率越快。',
  },
  intervalHistoryPxSec: {
    title: '歷史資料要求頻率 (秒)',
    group: '其他',
    step: 1,
    min: 3,
    tips: '秒數越低，網路流量消耗越大；資料準確度更高。',
  },
};
