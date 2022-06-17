import {OnPxChartUpdatedEvent} from '../../type';
import {toBarData} from '../../utils';


export const handlePrice = ({chartDataRef, chartObjectRef, setObject}: OnPxChartUpdatedEvent) => {
  if (!chartObjectRef.current) {
    return;
  }

  const {price} = chartObjectRef.current.initData.series;

  const lastPrice = chartDataRef.current.data.at(-1);

  if (!lastPrice) {
    return;
  }

  const {symbol} = chartDataRef.current.contract;
  const title = symbol;

  price.setData(chartDataRef.current.data.map(toBarData));
  price.applyOptions({title});

  // Update legend
  setObject.legend((legend) => ({
    ...legend,
    // Only update the legend on Px changed if not hovered,
    // So even if the latest bar is updated, the legend won't change
    ...(legend.hovered ? {} : chartDataRef.current.latestMarket),
  }));
};
