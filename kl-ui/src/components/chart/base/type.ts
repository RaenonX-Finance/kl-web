import React from 'react';

import {IChartApi} from 'lightweight-charts';
import {User} from 'next-auth';


export type ChartSetState<T> = (updateFunc: (prevLegend: T) => T) => void;

export type ChartStatefulObjects<L> = {
  legend: L,
};

export type ChartSetStateObjects<L> = ChartStatefulObjects<ChartSetState<L>>;

export type ChartInitCalcObject<T, D> = (data: T) => D;

export type ChartCalcObjects<T, L> = ChartStatefulObjects<
  ChartInitCalcObject<T, L>
>;

export type ChartRenderObject<D> = (object: D) => React.ReactNode;

export type ChartRenderObjects<L> = {
  legend: ChartRenderObject<L>,
};

export type ChartObjectRef<T> = {
  chartContainer: HTMLDivElement,
  initData: T,
};

export type InitChartPayload<T, L, A> = {
  // Needs to be `ref` because crosshair move event subscription refers chart data
  chartDataRef: React.MutableRefObject<T>,
  setObject: ChartSetStateObjects<L>,
  chartContainer: HTMLDivElement,
  layoutConfig: A,
};

export type UseChartPayload<T, R, L, A, P> = {
  initChart: ChartInitEventHandler<T, R, L, A, P>,
  onDataUpdated: () => void,
  height: number,
  width: number,
};

export type UseChartReturn<T, R, L, A, P> = {
  makeChart: (payload: InitChartPayload<T, L, A> & P) => void,
  chartRef: React.MutableRefObject<IChartApi | undefined>,
  chartObjectRef: React.MutableRefObject<ChartObjectRef<R> | undefined>,
};

export type OnChartChangedEventCommon<T, R, L, A> = {
  chartRef: React.MutableRefObject<IChartApi | undefined>,
  chartDataRef: React.MutableRefObject<T>,
  chartObjectRef: React.MutableRefObject<ChartObjectRef<R> | undefined>,
  setObject: ChartSetStateObjects<L>,
  layoutConfig: A,
  user: User | undefined,
};

export type OnChartInitEvent<T, R, L, A, P = {}> =
  InitChartPayload<T, L, A> &
  OnChartChangedEventCommon<T, R, L, A> &
  P;

export type ChartInitEventHandler<T, R, L, A, P = {}> = (e: OnChartInitEvent<T, R, L, A, P>) => R;

export type OnChartDataUpdatedEvent<T, P, R, L, A> = OnChartChangedEventCommon<T, R, L, A> & {
  payload: P,
  partial: boolean,
};

export type ChartDataUpdatedEventHandler<T, P, R, L, A> = (e: OnChartDataUpdatedEvent<T, P, R, L, A>) => void;
