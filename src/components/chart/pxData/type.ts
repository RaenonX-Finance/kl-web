import {IPriceLine, ISeriesApi} from 'lightweight-charts';

import {CustomSrLevel} from '../../../types/init';
import {PxData} from '../../../types/pxData';
import {
  ChartDataUpdatedEventHandler,
  ChartInitEventHandler,
  OnChartDataUpdatedEvent,
  OnChartInitEvent,
} from '../base/type';


export type PxChartSeries = {
  price: ISeriesApi<'Candlestick'>,
  vwap: ISeriesApi<'Line'>,
  sma: Record<number, ISeriesApi<'Line'>>,
};

export type PxChartLines = {
  srLevelLines: Record<number, IPriceLine>,
};

export type PxChartLegendData = {
  open: number,
  high: number,
  low: number,
  close: number,
  decimals: number,
  changeVal: number,
  changePct: number,
  hovered: boolean,
};

export type PxChartLayoutConfigKeys =
  'vwap' |
  'sma' |
  'srLevel' |
  'srLevelWeak';

export type PxChartLayoutConfigEntry = {
  title: string,
  enable: boolean,
  group: string,
};

export type PxChartLayoutConfig = {[key in PxChartLayoutConfigKeys]: PxChartLayoutConfigEntry};

export type PxChartInitData = {
  series: PxChartSeries,
  lines: PxChartLines,
};

export type PxChartPayload = {
  customSrLevels: CustomSrLevel[] | undefined,
};

export type OnPxChartInitEvent = OnChartInitEvent<
  PxData,
  PxChartInitData,
  PxChartLegendData,
  PxChartLayoutConfig,
  PxChartPayload
>;

export type PxChartInitEventHandler = ChartInitEventHandler<
  PxData,
  PxChartInitData,
  PxChartLegendData,
  PxChartLayoutConfig,
  PxChartPayload
>;

export type OnPxChartUpdatedEvent = OnChartDataUpdatedEvent<
  PxData,
  PxChartPayload,
  PxChartInitData,
  PxChartLegendData,
  PxChartLayoutConfig
>;

export type PxChartUpdatedEventHandler = ChartDataUpdatedEventHandler<
  PxData,
  PxChartPayload,
  PxChartInitData,
  PxChartLegendData,
  PxChartLayoutConfig
>;
