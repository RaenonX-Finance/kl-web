import {PxDataBar} from '../types/pxData';


export const updatePxDataBar = (bar: PxDataBar, nextPx: number): PxDataBar => {
  return {
    ...bar,
    high: Math.max(bar.high, nextPx),
    low: Math.min(bar.low, nextPx),
    close: nextPx,
  };
};

export const forceMinTick = (val: number, tick: number): number => {
  return val - val % tick;
};

export const sum = (arr: number[]): number => {
  return arr.reduce((acc, c) => acc + c, 0);
};

export const avg = (arr: number[]): number => {
  return sum(arr) / arr.length;
};
