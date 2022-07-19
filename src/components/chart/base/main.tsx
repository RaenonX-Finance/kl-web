import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useAnimation} from '../../../hooks/animation';
import {configDispatchers} from '../../../state/config/dispatchers';
import {useSingleLayoutConfigSelector} from '../../../state/config/selector';
import {ConfigDispatcherName, LayoutConfigUpdatePayload} from '../../../state/config/type';
import {useDispatch} from '../../../state/store';
import {PxSlotName} from '../../../types/pxData';
import {PeriodTimer} from '../../periodTimer/main';
import {SocketPingableTimeAgo} from '../../timeAgo/pingable';
import {PxChartLayoutConfigSingle} from '../pxData/type';
import {useTradingViewChart} from './hook';
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
  renderLayoutConfig: (
    security: string,
    config: A,
    setConfig: (newConfig: LayoutConfigUpdatePayload) => Promise<void>,
  ) => React.ReactNode,
  getPeriodSec: (data: T) => number,
  getDataLastUpdate: (data: T) => number,
  getDataSecurity: (data: T) => string,
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
  getDataSecurity,
}: TradingViewChartProps<T, P, R, L, PxChartLayoutConfigSingle>) => {
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const chartDataRef = React.useRef<T>(chartData);
  const updateIndicatorRef = useAnimation({
    deps: [getDataLastUpdate(chartData)],
  });
  const lastUpdated = React.useRef(getDataLastUpdate(chartData));
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

  const onDataUpdatedInternal = (forceUpdate: boolean) => () => {
    chartDataRef.current = chartData;
    const dataLastUpdated = getDataLastUpdate(chartData);

    if (!isLayoutConfigReady || (!forceUpdate && dataLastUpdated <= lastUpdated.current)) {
      return;
    }

    onDataUpdated({chartRef, chartDataRef, chartObjectRef, setObject, payload, layoutConfig});
    lastUpdated.current = dataLastUpdated;
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

  const {makeChart, chartRef, chartObjectRef} = useTradingViewChart<T, R, L, PxChartLayoutConfigSingle, P>({
    initChart,
    onDataUpdated: onDataUpdatedInternal(true),
    width,
    height,
  });

  React.useEffect(onLoad, [isLayoutConfigReady]);
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
            {
              layoutConfig &&
              renderLayoutConfig(getDataSecurity(chartData), layoutConfig, setLayoutConfig)
            }
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
