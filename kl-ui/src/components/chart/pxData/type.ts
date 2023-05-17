import {PxData} from 'kl-web-common/models/api/px/pxData';
import {PxMomentumIndex} from 'kl-web-common/models/api/px/pxDataBar';
import {PxEmaPeriodPair} from 'kl-web-common/models/config/emaPair';
import {IPriceLine, ISeriesApi} from 'lightweight-charts';

import {
  ChartDataUpdatedEventHandler,
  ChartInitEventHandler,
  OnChartDataUpdatedEvent,
  OnChartInitEvent,
} from '../base/type';
import {PxLayoutConfigSingle} from '../config/layout/type';


export type PxChartEmaLinePair = {[key in keyof PxEmaPeriodPair]: ISeriesApi<'Line'>};

export type PxChartEmaPairFillable = {
  lines: PxChartEmaLinePair,
  fill: ISeriesApi<'Candlestick'>,
};

export type PxChartSeries = {
  price: ISeriesApi<'Candlestick'>,
  tiePoint: ISeriesApi<'Line'>,
  emaNet: PxChartEmaPairFillable,
  emaStrongSr: PxChartEmaLinePair[],
};

export type PxChartExtremaSeries = {
  min: IPriceLine,
  max: IPriceLine,
};

export type PxChartLines = {
  srLevelLines: Record<number, Record<number, IPriceLine>>,
  prevDayClose: IPriceLine | null,
  extrema: PxChartExtremaSeries,
};

export type PxChartLegendData = {
  open: number,
  high: number,
  low: number,
  close: number,
  decimals: number,
  changeVal: number,
  changePct: number,
  momentum: PxMomentumIndex,
  tiePoint: number | null,
  hovered: boolean,
};

export type PxChartInitData = {
  series: PxChartSeries,
  lines: PxChartLines,
};

export type PxChartPayload = {
  requestPxData: (offset: number) => void,
};

export type OnPxChartInitEvent = OnChartInitEvent<
  PxData,
  PxChartInitData,
  PxChartLegendData,
  PxLayoutConfigSingle,
  PxChartPayload
>;

export type PxChartInitEventHandler = ChartInitEventHandler<
  PxData,
  PxChartInitData,
  PxChartLegendData,
  PxLayoutConfigSingle,
  PxChartPayload
>;

export type OnPxChartUpdatedEvent = OnChartDataUpdatedEvent<
  PxData,
  PxChartPayload,
  PxChartInitData,
  PxChartLegendData,
  PxLayoutConfigSingle
>;

export type PxChartUpdatedEventHandler = ChartDataUpdatedEventHandler<
  PxData,
  PxChartPayload,
  PxChartInitData,
  PxChartLegendData,
  PxLayoutConfigSingle
>;
