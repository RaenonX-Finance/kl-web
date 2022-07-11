import {PxChartInitEventHandler} from '../../type';
import {handleChartEvent} from '../onEvent/main';
import {handleEmaNet} from './emaNet';
import {handleEmaStrongSr} from './emaStrongSr';
import {handleExtrema} from './extrema';
import {handleLegend} from './legend';
import {handlePrice} from './price';
import {handleSR} from './sr/main';
import {handleSrCustom} from './srCustom';
import {handleTiePoint} from './tiePoint';


export const onPxChartInit: PxChartInitEventHandler = (e) => {
  const emaNet = handleEmaNet(e);
  const emaStrongSr = handleEmaStrongSr(e);
  const price = handlePrice(e);
  const tiePoint = handleTiePoint(e);
  const srLevelLines = handleSR(e, price);
  const extrema = handleExtrema(e, price);
  handleLegend(e);
  handleSrCustom(e, price);

  handleChartEvent(e);

  return {
    series: {price, tiePoint, emaNet, emaStrongSr},
    lines: {srLevelLines, extrema},
  };
};
