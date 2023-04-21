import {PxCandleDirection} from 'kl-web-common/models/api/px/pxDataBar';
import {PxEmaPeriodPair} from 'kl-web-common/models/config/emaPair';
import {LineStyle} from 'lightweight-charts';

import {ExtremaCommonOptions, SrLevelCommonOptions} from './type';


export const bullColor = '#ef5350';

export const neutralColor = '#c5c5c5';

export const bearColor = '#26a69a';

export const bullColorForFill = 'rgba(239, 83, 80, 0.3)';

export const bearColorForFill = 'rgba(38, 166, 154, 0.3)';

export const currentPxColor = '#d7d7d7';

export const prevDayCloseColor = 'rgb(238,20,225)';

export const colorOfCandlestickDirection: {[dir in PxCandleDirection]: string} = {
  [1]: bullColor,
  [0]: neutralColor,
  [-1]: bearColor,
};

export const pxLineColors = {
  tiePoint: '#fa7209',
};

export const emaLineColors: {[key in keyof PxEmaPeriodPair]: string} = {
  fast: bullColor,
  slow: bearColor,
};

export const srLevelColors = [
  '#f23645',
  '#deb900',
  '#8c47bd',
  '#3aa13e',
  '#1ca8b6',
];

export const getSrLevelColor = (idx: number): string => {
  return srLevelColors[idx % srLevelColors.length];
};

export const srLevelCommonOptions: SrLevelCommonOptions = {
  title: '',
  lineStyle: LineStyle.Solid,
  lineWidth: 1,
  lineVisible: true,
};

export const tiePointLabel = 'L/S';

export const extremaCommonOptions: ExtremaCommonOptions = {
  color: '#606569',
  lineStyle: LineStyle.Dotted,
  lineWidth: 2,
};
