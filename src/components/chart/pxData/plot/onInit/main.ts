import {PxChartInitEventHandler} from '../../type';
import {handleLegendUpdate} from '../eventHandler';
import {handleEmaNet} from './emaNet';
import {handleLegend} from './legend';
import {handlePrice} from './price';
import {handleSR} from './sr';
import {handleSrCustom} from './srCustom';
import {handleTiePoint} from './tiePoint';


export const onPxChartInit: PxChartInitEventHandler = (e) => {
  const price = handlePrice(e);
  const tiePoint = handleTiePoint(e);
  const srLevelLines = handleSR(e, price);
  const emaNet = handleEmaNet(e);
  handleLegend(e);
  handleSrCustom(e, price);
  handleLegendUpdate(e);

  return {
    series: {price, tiePoint, emaNet},
    lines: {srLevelLines},
  };
};
