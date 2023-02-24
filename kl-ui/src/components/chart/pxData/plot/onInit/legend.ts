import {OnPxChartInitEvent} from '../../type';


export const handleLegend = ({chartDataRef, setObject}: OnPxChartInitEvent) => {
  setObject.legend((legend) => ({
    ...legend,
    close: chartDataRef.current.data.at(-1)?.close || legend.close,
  }));
};
