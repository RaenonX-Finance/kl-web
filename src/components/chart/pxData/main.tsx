import React from 'react';

import {PxData} from '../../../types/pxData';
import {getDecimalPlaces} from '../../../utils/calc';
import {TradingViewChart, TradingViewChartProps} from '../base/main';
import {generateInitialConfig} from './config';
import {PxChartLayoutConfigPanel} from './layoutConfig/main';
import {PxChartLegend} from './legend/main';
import {onPxChartInit} from './plot/onInit/main';
import {onPxChartUpdated} from './plot/onUpdate/main';
import {PxChartInitData, PxChartLayoutConfig, PxChartLegendData, PxChartPayload} from './type';


type Props = Omit<
  TradingViewChartProps<
    PxData,
    PxChartPayload,
    PxChartInitData,
    PxChartLegendData,
    PxChartLayoutConfig
  >,
  'initChart' |
  'calcObjects' |
  'renderObjects' |
  'renderLayoutConfig' |
  'onDataUpdated' |
  'getIdentifier' |
  'getPnLMultiplier' |
  'getPeriodSec' |
  'getInitialLayoutConfig' |
  'getDataLastUpdate'
> & {
  title: string,
};


export const PxDataChart = (props: Props) => {
  const {title} = props;

  return (
    <TradingViewChart
      initChart={onPxChartInit}
      onDataUpdated={onPxChartUpdated}
      calcObjects={{
        legend: (data) => {
          const lastHistory = data.data.at(-1);

          const legend: PxChartLegendData = {
            decimals: getDecimalPlaces(data.contract.minTick),
            hovered: false,
            strength: lastHistory?.strength ?? '?',
            tiePoint: lastHistory?.tiePoint ?? NaN,
            ...data.latestMarket,
          };

          return legend;
        },
      }}
      renderObjects={{
        legend: (chartData, legend) => <PxChartLegend data={chartData} legend={legend} title={title}/>,
      }}
      renderLayoutConfig={(config, setConfig) => (
        <PxChartLayoutConfigPanel title={title} config={config} setConfig={setConfig}/>
      )}
      getPeriodSec={(data) => data.periodSec}
      getInitialLayoutConfig={generateInitialConfig}
      getDataLastUpdate={({lastUpdated}) => lastUpdated}
      {...props}
    />
  );
};
