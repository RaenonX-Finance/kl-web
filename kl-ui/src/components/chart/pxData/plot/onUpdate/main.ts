import {handleEmaNet} from './emaNet';
import {handleEmaStrongSr} from './emaStrongSr';
import {handleExtrema} from './extrema';
import {handleLegend} from './legend';
import {handlePrice} from './price';
import {handleSR} from './sr/main';
import {handleTiePoint} from './tiePoint';
import {PxChartUpdatedEventHandler} from '../../type';


export const onPxChartUpdated: PxChartUpdatedEventHandler = (e) => {
  handlePrice(e);
  handleTiePoint(e);
  handleEmaNet(e);
  handleEmaStrongSr(e);
  handleLegend(e);
  handleSR(e);
  handleExtrema(e);
};
