import React from 'react';

import {PxData} from 'kl-web-common/models/pxData';

import {PxChartLegend} from './legend/main';
import {onPxChartInit} from './plot/onInit/main';
import {onPxChartUpdated} from './plot/onUpdate/main';
import {PxChartInitData, PxChartLegendData, PxChartPayload} from './type';
import {useCompletePxUpdateSelector, useLastPxUpdateSelector} from '../../../state/data/selector';
import {toLegendData} from '../../../utils/px';
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
        legend: toLegendData,
      }}
      renderObjects={{
        legend: (chartData, legend) => <PxChartLegend data={chartData} legend={legend} slot={slot}/>,
      }}
      renderLayoutConfig={({layoutConfig, setLayoutConfig, show, setShow}) => (
        <PxLayoutConfigPanel
          title={title}
          slot={slot}
          config={layoutConfig}
          setConfig={setLayoutConfig}
          show={show}
          setShow={setShow}
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
