import {LastPriceAnimationMode} from 'lightweight-charts';

import {bearColor, bullColor} from './const';
import {ColorOverridder} from './type';


export const getAnimationMode = (enabled: boolean): LastPriceAnimationMode => (
  enabled ?
    LastPriceAnimationMode.OnDataUpdate :
    LastPriceAnimationMode.Disabled
);

export const getEmaColorOverridder = (emaPeriod: number): ColorOverridder => (bar) => {
  const barEmaValue = bar[`ema${emaPeriod}`];

  if (!barEmaValue) {
    throw Error(`Value of ${emaPeriod} EMA does not exist on bar`);
  }

  return bar.close > barEmaValue ? bullColor : bearColor;
};
