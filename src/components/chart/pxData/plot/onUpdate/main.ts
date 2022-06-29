import {PxChartUpdatedEventHandler} from '../../type';
import {handleEmaNet} from './emaNet';
import {handleLegend} from './legend';
import {handlePrice} from './price';
import {handleSR} from './sr';
import {handleTiePoint} from './tiePoint';


export const onPxChartUpdated: PxChartUpdatedEventHandler = (e) => {
  handlePrice(e);
  handleTiePoint(e);
  handleEmaNet(e);
  handleLegend(e);
  handleSR(e);
};
