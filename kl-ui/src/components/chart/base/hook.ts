import React from 'react';

import {createChart, IChartApi} from 'lightweight-charts';
import {useSession} from 'next-auth/react';

import {chartOptions} from './options';
import {ChartObjectRef, UseChartPayload, UseChartReturn} from './type';


export const useTradingViewChart = <T, R, L, A, P>({
  initChart,
  onDataUpdated,
  width,
  height,
}: UseChartPayload<T, R, L, A, P>): UseChartReturn<T, R, L, A, P> => {
  const {data} = useSession();
  const chartRef = React.useRef<IChartApi>();
  const chartObjectRef = React.useRef<ChartObjectRef<R>>();

  const makeChart: UseChartReturn<T, R, L, A, P>['makeChart'] = (payload) => {
    const {chartContainer} = payload;

    chartRef.current = createChart(chartContainer, {
      ...chartOptions,
      width,
      height,
    });

    chartObjectRef.current = {
      chartContainer,
      initData: initChart({chartRef, chartObjectRef, user: data?.user, ...payload}),
    };
  };

  React.useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    chartRef.current.applyOptions({width, height});

    onDataUpdated();
  }, [width, height]);

  return {makeChart, chartRef, chartObjectRef};
};
