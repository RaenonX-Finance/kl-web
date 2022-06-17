import {OnPxChartInitEvent, PxChartLegendData} from '../type';


export const handleLegendUpdate = (e: OnPxChartInitEvent) => {
  const {chartRef, chartDataRef, setObject} = e;

  if (!chartRef.current) {
    throw new Error('Legend to be handled while the chart is not ready');
  }

  chartRef.current.subscribeCrosshairMove(({time}) => {
    const pxData = chartDataRef.current.data;
    const last = chartDataRef.current.latestMarket;

    const hovered = pxData.find(({epochSec}) => epochSec === time);

    // Using `last` because moving out of chart makes `lastPrice` undefined
    setObject.legend(({decimals}) => {
      const legend: PxChartLegendData = {
        decimals,
        open: hovered?.open ?? last?.open,
        high: hovered?.high ?? last?.high,
        low: hovered?.low ?? last?.low,
        close: hovered?.close ?? last?.close,
        // Diff / Change Val could be 0
        changeVal: hovered?.diff ?? last?.changeVal,
        changePct: (hovered ? hovered.diff / hovered.open * 100 : null) ?? last?.changePct,
        hovered: !!hovered,
      };

      return legend;
    });
  });
};
