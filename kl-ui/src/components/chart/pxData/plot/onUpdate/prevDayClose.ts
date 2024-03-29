import {getLayoutConfig} from '../../../../../state/config/utils';
import {OnPxChartUpdatedEvent} from '../../type';
import {prevDayCloseColor} from '../const';


export const handlePrevDayClose = ({chartObjectRef, chartDataRef, layoutConfig, user}: OnPxChartUpdatedEvent) => {
  const latestMarket = chartDataRef.current.latestMarket;
  if (!latestMarket) {
    return null;
  }

  const axisLabelVisible = getLayoutConfig({config: layoutConfig, key: 'prevDayCloseLabel', user});
  const lineVisible = getLayoutConfig({config: layoutConfig, key: 'prevDayClose', user});

  chartObjectRef.current?.initData.lines.prevDayClose?.applyOptions({
    axisLabelVisible,
    lineVisible,
    price: latestMarket.o,
    color: prevDayCloseColor,
  });
};
