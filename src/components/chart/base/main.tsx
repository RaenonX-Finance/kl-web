import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {configDispatchers} from '../../../state/config/dispatchers';
import {useSingleLayoutConfigSelector} from '../../../state/config/selector';
import {ConfigDispatcherName, LayoutConfigUpdatePayload} from '../../../state/config/type';
import {useDispatch} from '../../../state/store';
import {PxSlotName} from '../../../types/pxData';
import {PeriodTimer} from '../../periodTimer/main';
import {PxLayoutConfigSingle} from '../config/layout/type';
import {PxChartToolbar, PxChartToolbarProps} from '../toolbar/main';
import {useTradingViewChart} from './hook';
import {PxChartLastUpdate} from './lastUpdate';
import styles from './main.module.scss';
import {
  ChartCalcObjects,
  ChartDataUpdatedEventHandler,
  ChartInitEventHandler,
  ChartRenderObjects,
  ChartSetStateObjects,
} from './type';


export type TradingViewChartProps<T, P, R, L, A> = {
  width: number,
  height: number,
  slot: PxSlotName,
  initChart: ChartInitEventHandler<T, R, L, A, P>,
  chartData: T,
  payload: P,
  onDataUpdated: ChartDataUpdatedEventHandler<T, P, R, L, A>,
  calcObjects: ChartCalcObjects<T, L>,
  renderObjects: ChartRenderObjects<T, L>,
  renderLayoutConfig: PxChartToolbarProps<A>['renderLayoutConfig'],
  getPeriodSec: (data: T) => number,
  getDataSecurity: (data: T) => string,
  getPartialUpdateDeps: (data: T) => React.DependencyList,
  getCompleteUpdateDeps: (data: T) => React.DependencyList,
};

export const TradingViewChart = <T, P, R, L>({
  width,
  height,
  slot,
  initChart,
  calcObjects,
  chartData,
  payload,
  onDataUpdated,
  renderObjects,
  renderLayoutConfig,
  getPeriodSec,
  getDataSecurity,
  getCompleteUpdateDeps,
  getPartialUpdateDeps,
}: TradingViewChartProps<T, P, R, L, PxLayoutConfigSingle>) => {
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const chartDataRef = React.useRef<T>(chartData);
  const [legend, setLegend] = React.useState<L>(calcObjects.legend(chartData));
  const layoutConfig = useSingleLayoutConfigSelector(slot);
  const dispatch = useDispatch();
  // Need to be explicit because empty object `{}` is also falsy
  const isLayoutConfigReady = layoutConfig !== null;

  const setObject: ChartSetStateObjects<L> = {
    legend: setLegend,
  };

  const setLayoutConfig = async (payload: LayoutConfigUpdatePayload) => {
    await dispatch(configDispatchers[ConfigDispatcherName.UPDATE_LAYOUT_CONFIG](payload));
  };

  const onDataUpdatedInternal = (partial: boolean) => () => {
    chartDataRef.current = chartData;
    if (!isLayoutConfigReady) {
      return;
    }

    onDataUpdated({chartRef, chartDataRef, chartObjectRef, setObject, payload, layoutConfig, partial});
  };

  const onLoad = () => {
    if (!chartContainerRef.current || !isLayoutConfigReady) {
      return;
    }

    chartDataRef.current = chartData;
    makeChart({
      chartDataRef,
      setObject,
      layoutConfig,
      chartContainer: chartContainerRef.current,
      width,
      height,
      ...payload,
    });
  };

  const {makeChart, chartRef, chartObjectRef} = useTradingViewChart<T, R, L, PxLayoutConfigSingle, P>({
    initChart,
    onDataUpdated: onDataUpdatedInternal(true),
    width,
    height,
  });

  React.useEffect(onLoad, [isLayoutConfigReady]);
  React.useEffect(
    onDataUpdatedInternal(true),
    [chartObjectRef.current?.initData, ...getPartialUpdateDeps(chartData)],
  );
  React.useEffect(
    onDataUpdatedInternal(false),
    // `layoutConfig` should trigger complete update because some config requires full re-paint
    // > For example, candlestick color
    [layoutConfig, ...getCompleteUpdateDeps(chartData)],
  );

  return (
    <div className={styles['chart']} ref={chartContainerRef}>
      <div className={styles['legend']}>
        {renderObjects.legend(chartData, legend)}
      </div>
      <div className={styles['toolbar']}>
        <Row className="g-2 align-items-center">
          <Col>
            <PxChartToolbar
              chartRef={chartRef}
              layoutConfig={layoutConfig}
              renderLayoutConfig={renderLayoutConfig}
              setLayoutConfig={setLayoutConfig}
              security={getDataSecurity(chartData)}
            />
          </Col>
        </Row>
      </div>
      <div className={styles['status']}>
        <Row className="g-2">
          <Col/>
          <Col xs="auto">
            <PeriodTimer periodSec={getPeriodSec(chartData)}/>
          </Col>
          <Col xs="auto" className="text-end">
            <PxChartLastUpdate security={getDataSecurity(chartData)}/>
          </Col>
        </Row>
      </div>
    </div>
  );
};
