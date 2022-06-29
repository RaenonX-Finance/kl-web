import {IPriceLine, ISeriesApi} from 'lightweight-charts';

import {CustomSrLevel} from '../../../types/init';
import {PxData} from '../../../types/pxData';
import {
  ChartDataUpdatedEventHandler,
  ChartInitEventHandler,
  OnChartDataUpdatedEvent,
  OnChartInitEvent,
} from '../base/type';
import {StrengthIndexCanNA} from './legend/type';


export type PxChartEmaLinePair = {
  fast: ISeriesApi<'Line'>,
  slow: ISeriesApi<'Line'>,
};

export type PxChartEmaPairFillable = {
  lines: PxChartEmaLinePair,
  fill: ISeriesApi<'Candlestick'>,
};

export type PxChartSeries = {
  price: ISeriesApi<'Candlestick'>,
  tiePoint: ISeriesApi<'Line'>,
  emaNet: PxChartEmaPairFillable,
} & {
  [key in PxChartEmaColorChangeKey]?: PxChartEmaLinePair
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
  strength: StrengthIndexCanNA,
  tiePoint: number | null,
  hovered: boolean,
};

export type PxChartEmaColorChangeKey = `emaColorChange${number}-${number}`;

export type PxChartLayoutConfigKeys =
  'srLevel' |
  'srLevelWeak' |
  'candlestickColor' |
  'tiePoint' |
  'emaNetLine' |
  'emaNet' |
  PxChartEmaColorChangeKey;

export type PxChartLayoutConfigEntry = {
  title: string,
  enable: boolean,
  group: string,
};

export type PxChartLayoutConfig = {
  [key in PxChartLayoutConfigKeys]: PxChartLayoutConfigEntry
} & {
  [key in PxChartEmaColorChangeKey]: PxChartLayoutConfigEntry[]
};

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
