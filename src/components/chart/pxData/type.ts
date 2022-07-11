import {IPriceLine, ISeriesApi} from 'lightweight-charts';

import {PxChartLayoutConfigState} from '../../../state/config/types';
import {CustomSrLevel} from '../../../types/init';
import {PxData, PxDataEmaPeriodPair} from '../../../types/pxData';
import {
  ChartDataUpdatedEventHandler,
  ChartInitEventHandler,
  OnChartDataUpdatedEvent,
  OnChartInitEvent,
} from '../base/type';
import {StrengthIndexCanNA} from './legend/type';


export type PxChartEmaLinePair = {[key in keyof PxDataEmaPeriodPair]: ISeriesApi<'Line'>};

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
  srLevelLines: {
    group: Record<number, Record<number, IPriceLine>>,
    basic: Record<number, IPriceLine>,
  },
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
  strength: StrengthIndexCanNA,
  tiePoint: number | null,
  hovered: boolean,
};

export type PxChartLayoutConfigKeys =
  'currentPxLine' |
  'tiePointLabel' |
  'emaNetLabel' |
  'emaStrongSrLabel' |
  'srLevelLabel' |
  'srLevelBasicLabel' |
  'candlestickColor' |
  'tiePoint' |
  'emaNet' |
  'emaStrongSr' |
  'srLevel' |
  'srLevelBasic' |
  'inChartExtrema' |
  'inChartExtremaLabel';

export type PxChartLayoutConfigEntry = {
  title: string,
  group: string,
  isDisabled?: (config: PxChartLayoutConfigState) => boolean,
};

export type PxChartLayoutConfigUI = {
  [key in PxChartLayoutConfigKeys]: PxChartLayoutConfigEntry
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
  PxChartLayoutConfigState,
  PxChartPayload
>;

export type PxChartInitEventHandler = ChartInitEventHandler<
  PxData,
  PxChartInitData,
  PxChartLegendData,
  PxChartLayoutConfigState,
  PxChartPayload
>;

export type OnPxChartUpdatedEvent = OnChartDataUpdatedEvent<
  PxData,
  PxChartPayload,
  PxChartInitData,
  PxChartLegendData,
  PxChartLayoutConfigState
>;

export type PxChartUpdatedEventHandler = ChartDataUpdatedEventHandler<
  PxData,
  PxChartPayload,
  PxChartInitData,
  PxChartLegendData,
  PxChartLayoutConfigState
>;
