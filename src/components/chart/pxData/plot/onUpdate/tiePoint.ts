import {OnPxChartUpdatedEvent} from '../../type';
import {handlePxLine} from './pxLine/main';


export const handleTiePoint = (e: OnPxChartUpdatedEvent) => {
  handlePxLine(
    e,
    {
      keyOfSeries: 'tiePoint',
      keyOfConfig: 'tiePoint',
      keyOfLegendData: 'tiePoint',
      keyForLineData: 'tiePoint',
    },
  );
};
