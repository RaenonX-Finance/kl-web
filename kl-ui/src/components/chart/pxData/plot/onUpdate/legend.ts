import {toLegendData} from '../../../../../utils/px';
import {OnPxChartUpdatedEvent} from '../../type';


export const handleLegend = ({chartDataRef, setObject}: OnPxChartUpdatedEvent) => {
  setObject.legend((legend) => ({
    ...legend,
    // Only update the legend on Px changed if not hovered,
    // So even if the latest bar is updated, the legend won't change
    ...(legend.hovered ? {} : toLegendData(chartDataRef.current)),
    // Always update momentum regardless the legend hovering status
    momentum: chartDataRef.current.latestMarket.momentum,
  }));
};
