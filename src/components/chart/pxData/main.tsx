import React from 'react';

import {PxChartLayoutConfigState} from '../../../state/config/types';
import {PxData} from '../../../types/pxData';
import {getDecimalPlaces} from '../../../utils/calc';
import {TradingViewChart, TradingViewChartProps} from '../base/main';
import {PxChartLayoutConfigPanel} from './layoutConfig/main';
import {PxChartLegend} from './legend/main';
import {onPxChartInit} from './plot/onInit/main';
import {onPxChartUpdated} from './plot/onUpdate/main';
import {PxChartInitData, PxChartLegendData, PxChartPayload} from './type';


type Props = Omit<
  TradingViewChartProps<
    PxData,
    PxChartPayload,
    PxChartInitData,
    PxChartLegendData,
    PxChartLayoutConfigState
  >,
  'initChart' |
  'calcObjects' |
  'renderObjects' |
  'renderLayoutConfig' |
  'onDataUpdated' |
  'getIdentifier' |
  'getPnLMultiplier' |
  'getPeriodSec' |
  'getDataLastUpdate'
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
        <PxChartLayoutConfigPanel title={title} slot={slot} config={config} setConfig={setConfig}/>
      )}
      getPeriodSec={(data) => data.periodSec}
      getDataLastUpdate={({lastUpdated}) => lastUpdated}
      {...props}
    />
  );
};
