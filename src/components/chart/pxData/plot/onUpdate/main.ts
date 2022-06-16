import {PxChartUpdatedEventHandler} from '../../type';
import {handlePrice} from './price';
import {handleSR} from './sr';


export const onPxChartUpdated: PxChartUpdatedEventHandler = (e) => {
  handlePrice(e);
  handleSR(e);
};
