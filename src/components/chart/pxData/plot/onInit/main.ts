import {PxChartInitEventHandler} from '../../type';
import {handleLegendUpdate} from '../eventHandler';
import {handlePrice} from './price';
import {handleSma} from './sma';
import {handleSR} from './sr';
import {handleSrCustom} from './srCustom';
import {handleVwap} from './vwap';


export const onPxChartInit: PxChartInitEventHandler = (e) => {
  const price = handlePrice(e);
  const vwap = handleVwap(e);
  const sma = handleSma(e);
  const srLevelLines = handleSR(e, price);
  handleSrCustom(e, price);
  handleLegendUpdate(e);

  return {
    series: {price, vwap, sma, avgCost: null, orderEntry: null},
    lines: {srLevelLines, openOrders: {}},
    position: null,
  };
};
