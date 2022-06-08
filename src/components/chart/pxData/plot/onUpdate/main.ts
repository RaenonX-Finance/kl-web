import {PxChartUpdatedEventHandler} from '../../type';
import {handlePrice} from './price';
import {handleSma} from './sma';
import {handleSR} from './sr';
import {handleVwap} from './vwap';


export const onPxChartUpdated: PxChartUpdatedEventHandler = (e) => {
  handlePrice(e);
  handleVwap(e);
  handleSma(e);
  handleSR(e);
};
