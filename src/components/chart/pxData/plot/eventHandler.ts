import {OnPxChartInitEvent, PxChartLegendData} from '../type';


export const handleLegendUpdate = (e: OnPxChartInitEvent) => {
  const {chartRef, chartDataRef, setObject} = e;

  if (!chartRef.current) {
    throw new Error('Legend to be handled while the chart is not ready');
  }

  chartRef.current.subscribeCrosshairMove(({time}) => {
    const pxData = chartDataRef.current.data;
    const latestMarket = chartDataRef.current.latestMarket;
    const last = chartDataRef.current.data.at(-1);

    const hovered = pxData.find(({epochSec}) => epochSec === time);

    // Using `last` because moving out of chart makes `lastPrice` undefined
    setObject.legend(({decimals}) => {
      const legend: PxChartLegendData = {
        decimals,
        open: hovered?.open ?? latestMarket?.open,
        high: hovered?.high ?? latestMarket?.high,
        low: hovered?.low ?? latestMarket?.low,
        close: hovered?.close ?? latestMarket?.close,
        // Diff / Change Val could be 0
        changeVal: hovered?.diff ?? latestMarket?.changeVal,
        changePct: (hovered ? hovered.diff / hovered.open * 100 : null) ?? latestMarket?.changePct,
        strength: last?.strength ?? null,
        hovered: !!hovered,
      };

      return legend;
    });
  });
};
