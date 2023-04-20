import {OnPxChartInitEvent} from '../../type';


export const handleLegend = ({chartData, setObject}: OnPxChartInitEvent) => {
  setObject.legend((legend) => ({
    ...legend,
    close: chartData.data.at(-1)?.close || legend.close,
  }));
};
