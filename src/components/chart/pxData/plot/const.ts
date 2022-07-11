import {LineStyle, LineWidth} from 'lightweight-charts';

import {PxDataCandlestickDirection, PxDataEmaPeriodPair} from '../../../../types/pxData';
import {ExtremaCommonOptions, SrLevelCommonOptions} from './type';


export const bullColor = '#ef5350';

export const bearColor = '#26a69a';

export const bullColorForFill = 'rgba(239,83,80,0.3)';

export const bearColorForFill = 'rgba(38,166,154,0.3)';

export const currentPxColor = '#d7d7d7';

export const colorOfCandlestickDirection: {[dir in PxDataCandlestickDirection]: string} = {
  [1]: bullColor,
  [-1]: bearColor,
};

export const pxLineColors = {
  tiePoint: '#fa7209',
};

export const emaLineColors: {[key in keyof PxDataEmaPeriodPair]: string} = {
  fast: bullColor,
  slow: bearColor,
};

export const srLevelBasicColor = '#cacaca';

export const srLevelGroupColors = [
  '#f23645',
  '#f5d52f',
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

export const srLevelCustom = 'rgba(255, 109, 14, 0.6)';

export const srLevelLineWidthStrong: LineWidth = 2;

export const tiePointLabel = 'L/S';

export const extremaCommonOptions: ExtremaCommonOptions = {
  color: '#606569',
  lineStyle: LineStyle.Dotted,
  lineWidth: 2,
};
