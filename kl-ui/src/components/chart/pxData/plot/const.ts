import {PxEmaPeriodPair} from 'kl-web-common/models/config/emaPair';
import {PxCandleDirection} from 'kl-web-common/models/pxDataBar';
import {LineStyle} from 'lightweight-charts';

import {ExtremaCommonOptions, SrLevelCommonOptions} from './type';


export const bullColor = '#ef5350';

export const neutralColor = '#c5c5c5';

export const bearColor = '#26a69a';

export const bullColorForFill = 'rgba(239,83,80,0.3)';

export const bearColorForFill = 'rgba(38,166,154,0.3)';

export const currentPxColor = '#d7d7d7';

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

export const srLevelBasicColor = '#cacaca';

export const srLevelGroupColors = [
  '#f23645',
  '#deb900',
  '#ad49c0',
  '#3aa13e',
  '#1ca8b6',
];

export const getSrLevelGroupColor = (idx: number): string => {
  return srLevelGroupColors[idx % srLevelGroupColors.length];
};

export const srLevelCommonOptions: SrLevelCommonOptions = {
  title: '',
  lineStyle: LineStyle.Solid,
  lineWidth: 1,
  lineVisible: true,
};

export const srLevelBasicCommonOptions: SrLevelCommonOptions = {
  ...srLevelCommonOptions,
  lineStyle: LineStyle.Dashed,
};

export const tiePointLabel = 'L/S';

export const extremaCommonOptions: ExtremaCommonOptions = {
  color: '#606569',
  lineStyle: LineStyle.Dotted,
  lineWidth: 2,
};
