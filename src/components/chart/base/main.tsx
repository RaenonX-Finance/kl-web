import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useAnimation} from '../../../hooks/animation';
import {configDispatchers} from '../../../state/config/dispatchers';
import {useConfigSelector} from '../../../state/config/selector';
import {ConfigDispatcherName, LayoutConfigUpdatePayload, PxChartLayoutConfigState} from '../../../state/config/types';
import {useDispatch} from '../../../state/store';
import {PxDataMapSlotNames} from '../../../types/pxData';
import {PeriodTimer} from '../../periodTimer/main';
import {SocketPingableTimeAgo} from '../../timeAgo/pingable';
import {useTradingViewChart} from './hook';
import styles from './main.module.scss';
import {ChartCalcObjects, ChartDataUpdatedEventHandler, ChartInitEventHandler, ChartRenderObjects} from './type';


export type TradingViewChartProps<T, P, R, L, A> = {
  width: number,
  height: number,
  slot: PxDataMapSlotNames,
  initChart: ChartInitEventHandler<T, R, L, A, P>,
  chartData: T,
  payload: P,
  onDataUpdated: ChartDataUpdatedEventHandler<T, P, R, L, A>,
  calcObjects: ChartCalcObjects<T, L>,
  renderObjects: ChartRenderObjects<T, L>,
  renderLayoutConfig: (config: A, setConfig: (newConfig: LayoutConfigUpdatePayload) => void) => React.ReactNode,
  getPeriodSec: (data: T) => number,
  getDataLastUpdate: (data: T) => number,
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
  getDataLastUpdate,
}: TradingViewChartProps<T, P, R, L, PxChartLayoutConfigState>) => {
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const chartDataRef = React.useRef<T>(chartData);
  const updateIndicatorRef = useAnimation({
    deps: [getDataLastUpdate(chartData)],
  });
  const lastUpdated = React.useRef(getDataLastUpdate(chartData));
  const [legend, setLegend] = React.useState<L>(calcObjects.legend(chartData));
  const layoutConfig = useConfigSelector().layoutConfig[slot];
  const dispatch = useDispatch();

  const setObject = {
    legend: setLegend,
  };

  const setLayoutConfig = (payload: LayoutConfigUpdatePayload) => {
    dispatch(configDispatchers[ConfigDispatcherName.UPDATE_LAYOUT_CONFIG](payload));
  };

  const onDataUpdatedInternal = (forceUpdate: boolean) => () => {
    chartDataRef.current = chartData;
    const dataLastUpdated = getDataLastUpdate(chartData);

    if (!forceUpdate && dataLastUpdated <= lastUpdated.current) {
      return;
    }

    onDataUpdated({chartRef, chartDataRef, chartObjectRef, setObject, payload, layoutConfig});
    lastUpdated.current = dataLastUpdated;
  };

  const onLoad = () => {
    if (!chartContainerRef.current) {
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

  const {makeChart, chartRef, chartObjectRef} = useTradingViewChart<T, R, L, PxChartLayoutConfigState, P>({
    initChart,
    onDataUpdated: onDataUpdatedInternal(true),
    width,
    height,
  });

  React.useEffect(onLoad, []);
  React.useEffect(
    onDataUpdatedInternal(true),
    [chartObjectRef.current?.initData, payload, layoutConfig],
  );
  React.useEffect(
    onDataUpdatedInternal(false),
    [getDataLastUpdate(chartData)],
  );

  return (
    <div className={styles['chart']} ref={chartContainerRef}>
      <div className={styles['legend']}>
        {renderObjects.legend(chartData, legend)}
      </div>
      <div className={styles['toolbar']}>
        <Row className="g-2 align-items-center">
          <Col>
            {renderLayoutConfig(layoutConfig, setLayoutConfig)}
            <Button size="sm" variant="outline-success" className="me-2" onClick={() => {
              chartRef.current?.timeScale().scrollToRealTime();
            }}>
              移到目前
            </Button>
            <Button size="sm" variant="outline-warning" onClick={() => {
              chartRef.current?.timeScale().resetTimeScale();
              chartRef.current?.priceScale().applyOptions({autoScale: true});
            }}>
              重設比例
            </Button>
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
            <SocketPingableTimeAgo
              ref={updateIndicatorRef}
              epochSec={lastUpdated.current}
              format={(secDiffMs) => (
                <><i className="bi bi-activity"/>&nbsp;{secDiffMs.toFixed(0)}</>
              )}
              updateMs={100}
              className={styles['update-animation']}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
