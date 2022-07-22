import {IPriceLine, ISeriesApi} from 'lightweight-charts';

import {CustomSrLevel} from '../../../types/init';
import {PxData, PxDataEmaPeriodPair} from '../../../types/pxData';
import {KeysOfType} from '../../../utils/types';
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

export type PxLayoutConfigSingle = {
  currentPxLine: boolean,
  tiePointLabel: boolean,
  emaNetLabel: boolean,
  emaStrongSrLabel: boolean,
  srLevelLabel: boolean,
  srLevelBasicLabel: boolean,
  candlestickColor: boolean,
  tiePoint: boolean,
  emaNet: boolean,
  emaStrongSr: boolean,
  srLevel: boolean,
  srLevelBasic: boolean,
  inChartExtrema: boolean,
  inChartExtremaLabel: boolean,
  intervalMarketPxSec: number,
  intervalHistoryPxSec: number,
};

export type PxLayoutConfigKeys = keyof PxLayoutConfigSingle;

export type PxLayoutConfigBoolValKeys = KeysOfType<PxLayoutConfigSingle, boolean>;

export type PxLayoutConfigEntry = {
  title: string,
  group: string,
  isDisabled?: (config: PxLayoutConfigSingle) => boolean,
  step?: number,
  min?: number,
  tips?: string,
};

export type PxLayoutConfigUI = {
  [key in PxLayoutConfigKeys]: PxLayoutConfigEntry
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
