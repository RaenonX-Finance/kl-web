import React from 'react';

import {PxData} from 'kl-web-common/models/pxData';

import {PxChartLegend} from './legend/main';
import {onPxChartInit} from './plot/onInit/main';
import {onPxChartUpdated} from './plot/onUpdate/main';
import {PxChartInitData, PxChartLegendData, PxChartPayload} from './type';
import {useCompletePxUpdateSelector, useLastPxUpdateSelector} from '../../../state/data/selector';
import {TradingViewChart, TradingViewChartProps} from '../base/main';
import {PxLayoutConfigPanel} from '../config/layout/main';
import {PxLayoutConfigSingle} from '../config/layout/type';


type Props = Omit<
  TradingViewChartProps<
    PxData,
    PxChartPayload,
    PxChartInitData,
    PxChartLegendData,
    PxLayoutConfigSingle
  >,
  'initChart' |
  'calcObjects' |
  'renderObjects' |
  'renderLayoutConfig' |
  'onDataUpdated' |
  'getIdentifier' |
  'getPnLMultiplier' |
  'getPeriodSec' |
  'getDataSecurity' |
  'getCompleteUpdateDeps' |
  'getPartialUpdateDeps'
> & {
  title: string,
};


export const PxDataChart = (props: Props) => {
  const {slot, title, chartData} = props;
  const lastUpdate = useLastPxUpdateSelector(chartData.contract.symbol);
  const completeUpdate = useCompletePxUpdateSelector(chartData.contract.symbol);

  return (
    <TradingViewChart
      initChart={onPxChartInit}
      onDataUpdated={onPxChartUpdated}
      calcObjects={{
        legend: (data) => {
          const lastHistory = data.data.at(-1);
          const latestMarket = data.latestMarket;

          const legend: PxChartLegendData = {
            decimals: data.contract.decimals,
            momentum: latestMarket.momentum,
            hovered: false,
            tiePoint: lastHistory?.tiePoint ?? NaN,
            open: latestMarket.o,
            high: latestMarket.h,
            low: latestMarket.l,
            close: latestMarket.c,
            changeVal: latestMarket.diffVal,
            changePct: latestMarket.diffPct,
          };

          return legend;
        },
      }}
      renderObjects={{
        legend: (chartData, legend) => <PxChartLegend data={chartData} legend={legend} slot={slot}/>,
      }}
      renderLayoutConfig={(security, config, setConfig) => (
        <PxLayoutConfigPanel
          security={security}
          title={title}
          slot={slot}
          config={config}
          setConfig={setConfig}
        />
      )}
      getPeriodSec={({periodSec}) => periodSec}
      getDataSecurity={({contract}) => contract.symbol}
      getCompleteUpdateDeps={() => [completeUpdate]}
      getPartialUpdateDeps={() => [lastUpdate]}
      {...props}
    />
  );
};
