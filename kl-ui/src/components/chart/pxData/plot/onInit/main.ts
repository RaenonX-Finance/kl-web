import {handleEmaNet} from './emaNet';
import {handleEmaStrongSr} from './emaStrongSr';
import {handleExtrema} from './extrema';
import {handleLegend} from './legend';
import {handlePrevDayClose} from './prevDayClose';
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
  const prevDayClose = handlePrevDayClose(e, price);
  const extrema = handleExtrema(e, price);
  handleLegend(e);

  const lastBar = e.chartDataRef.current.data.at(-1);
  console.log(lastBar?.date, lastBar?.close);

  handleChartEvent(e);

  return {
    series: {price, tiePoint, emaNet, emaStrongSr},
    lines: {srLevelLines, prevDayClose, extrema},
  };
};
