import {PxChartUpdatedEventHandler} from '../../type';
import {handleLegend} from './legend';
import {handlePrice} from './price';
import {handleSR} from './sr';


export const onPxChartUpdated: PxChartUpdatedEventHandler = (e) => {
  handlePrice(e);
  handleLegend(e);
  handleSR(e);
};
