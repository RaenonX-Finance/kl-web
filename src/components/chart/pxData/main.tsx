import React from 'react';

import {PxData} from '../../../types/pxData';
import {TradingViewChart, TradingViewChartProps} from '../base/main';
import {PxChartLayoutConfigPanel} from './layoutConfig/main';
import {PxChartLegend} from './legend/main';
import {onPxChartInit} from './plot/onInit/main';
import {onPxChartUpdated} from './plot/onUpdate/main';
import {PxChartInitData, PxChartLayoutConfigSingle, PxChartLegendData, PxChartPayload} from './type';


type Props = Omit<
  TradingViewChartProps<
    PxData,
    PxChartPayload,
    PxChartInitData,
    PxChartLegendData,
    PxChartLayoutConfigSingle
  >,
  'initChart' |
  'calcObjects' |
  'renderObjects' |
  'renderLayoutConfig' |
  'onDataUpdated' |
  'getIdentifier' |
  'getPnLMultiplier' |
  'getPeriodSec' |
  'getDataLastUpdate' |
  'getDataSecurity'
> & {
  title: string,
};


export const PxDataChart = (props: Props) => {
  const {slot, title} = props;

  return (
    <TradingViewChart
      initChart={onPxChartInit}
      onDataUpdated={onPxChartUpdated}
      calcObjects={{
        legend: (data) => {
          const lastHistory = data.data.at(-1);

          const legend: PxChartLegendData = {
            decimals: data.contract.decimals,
            hovered: false,
            strength: lastHistory?.strength ?? '?',
            tiePoint: lastHistory?.tiePoint ?? NaN,
            ...data.latestMarket,
          };

          return legend;
        },
      }}
      renderObjects={{
        legend: (chartData, legend) => <PxChartLegend data={chartData} legend={legend} slot={slot}/>,
      }}
      renderLayoutConfig={(security, config, setConfig) => (
        <PxChartLayoutConfigPanel
          security={security}
          title={title}
          slot={slot}
          config={config}
          setConfig={setConfig}
        />
      )}
      getPeriodSec={({periodSec}) => periodSec}
      getDataLastUpdate={({lastUpdated}) => lastUpdated}
      getDataSecurity={({contract}) => contract.symbol}
      {...props}
    />
  );
};
