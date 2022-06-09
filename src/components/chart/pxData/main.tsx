import React from 'react';

import {PxData} from '../../../types/pxData';
import {getDecimalPlaces} from '../../../utils/calc';
import {TradingViewChart, TradingViewChartProps} from '../base/main';
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
          const last = data.data.at(-1);

          return {
            decimals: getDecimalPlaces(data.contract.minTick),
            epochSec: NaN,
            open: NaN,
            high: NaN,
            low: NaN,
            close: NaN,
            vwap: NaN,
            diff: NaN,
            ...last,
          };
        },
      }}
      renderObjects={{
        legend: (chartData, legend) => <PxChartLegend data={chartData} legend={legend}/>,
      }}
      renderLayoutConfig={(config, setConfig) => (
        <PxChartLayoutConfigPanel title={title} config={config} setConfig={setConfig}/>
      )}
      getPeriodSec={(data) => data.periodSec}
      getInitialLayoutConfig={() => ({
        vwap: {
          title: 'VWAP',
          enable: false,
          group: '指標',
        },
        sma: {
          title: 'SMAs',
          enable: true,
          group: '指標',
        },
        srLevel: {
          title: '顯示全部',
          enable: true,
          group: '撐壓',
        },
        srLevelWeak: {
          title: '顯示弱撐壓',
          enable: false,
          group: '撐壓',
        },
      })}
      getDataLastUpdate={({lastUpdated}) => lastUpdated}
      {...props}
    />
  );
};
