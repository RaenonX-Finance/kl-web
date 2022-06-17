import {PxChartInitEventHandler} from '../../type';
import {handleLegendUpdate} from '../eventHandler';
import {handlePrice} from './price';
import {handleSR} from './sr';
import {handleSrCustom} from './srCustom';


export const onPxChartInit: PxChartInitEventHandler = (e) => {
  const price = handlePrice(e);
  const srLevelLines = handleSR(e, price);
  handleSrCustom(e, price);
  handleLegendUpdate(e);

  return {
    series: {price, avgCost: null, orderEntry: null},
    lines: {srLevelLines, openOrders: {}},
    position: null,
  };
};
