import {handlePxLine} from './pxLine/main';
import {OnPxChartUpdatedEvent} from '../../type';
import {tiePointLabel} from '../const';


export const handleTiePoint = (e: OnPxChartUpdatedEvent) => {
  handlePxLine(
    e,
    {
      title: tiePointLabel,
      keyOfSeries: 'tiePoint',
      keyOfConfig: 'tiePoint',
      keyOfConfigLabel: 'tiePointLabel',
      keyOfLegendData: 'tiePoint',
      keyForLineData: 'tiePoint',
    },
  );
};
