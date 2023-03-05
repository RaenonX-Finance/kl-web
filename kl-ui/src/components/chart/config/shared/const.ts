import {PxSharedConfigUI} from './type';


export const sharedConfigEntries: PxSharedConfigUI = {
  intervalMarketPxSec: {
    group: '資料處理',
    title: '行情刷新頻率 (秒)',
    step: 0.05,
    min: 0.1,
    tips: '秒數越低，系統資源消耗量越大；報價更新頻率越快。',
  },
};
