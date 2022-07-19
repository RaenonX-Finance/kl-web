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

export type PxChartLayoutConfigSingle = {
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
};

export type PxChartLayoutConfigKeys = keyof PxChartLayoutConfigSingle;

export type PxChartLayoutConfigBoolValKeys = KeysOfType<PxChartLayoutConfigSingle, boolean>;

export type PxChartLayoutConfigEntry = {
  title: string,
  group: string,
  isDisabled?: (config: PxChartLayoutConfigSingle) => boolean,
  step?: number,
  min?: number,
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
  PxChartLayoutConfigSingle,
  PxChartPayload
>;

export type PxChartInitEventHandler = ChartInitEventHandler<
  PxData,
  PxChartInitData,
  PxChartLegendData,
  PxChartLayoutConfigSingle,
  PxChartPayload
>;

export type OnPxChartUpdatedEvent = OnChartDataUpdatedEvent<
  PxData,
  PxChartPayload,
  PxChartInitData,
  PxChartLegendData,
  PxChartLayoutConfigSingle
>;

export type PxChartUpdatedEventHandler = ChartDataUpdatedEventHandler<
  PxData,
  PxChartPayload,
  PxChartInitData,
  PxChartLegendData,
  PxChartLayoutConfigSingle
>;
