import {handleEmaNet} from './emaNet';
import {handleEmaStrongSr} from './emaStrongSr';
import {handleExtrema} from './extrema';
import {handleLegend} from './legend';
import {handlePrice} from './price';
import {handleSR} from './sr/main';
import {handleTiePoint} from './tiePoint';
import {PxChartInitEventHandler} from '../../type';
import {handleChartEvent} from '../onEvent/main';


export const onPxChartInit: PxChartInitEventHandler = (e) => {
  const emaNet = handleEmaNet(e);
  const emaStrongSr = handleEmaStrongSr(e);
  const price = handlePrice(e);
  const tiePoint = handleTiePoint(e);
  const srLevelLines = handleSR(e, price);
  const extrema = handleExtrema(e, price);
  handleLegend(e);

  handleChartEvent(e);

  return {
    series: {price, tiePoint, emaNet, emaStrongSr},
    lines: {srLevelLines, extrema},
  };
};
