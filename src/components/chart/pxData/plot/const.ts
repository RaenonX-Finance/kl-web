import chroma from 'chroma-js';
import {LineStyle, LineWidth} from 'lightweight-charts';

import {PxDataCandlestickDirection} from '../../../../types/pxData';


export const bullColor = '#ef5350';

export const bearColor = '#26a69a';

export const colorOfCandlestickDirection: {[dir in PxDataCandlestickDirection]: string} = {
  [1]: bullColor,
  [-1]: bearColor,
};

export const pxLineColors = {
  tiePoint: '#fa7209',
};

const srLevelColorWeak = 'rgba(255, 0, 221, 0.8)';

const srLevelColorStrong = 'rgba(255, 255, 0, 0.6)';

export const srLevelCustom = 'rgba(255, 109, 14, 0.6)';

const srLevelColorScale = chroma.scale([srLevelColorWeak, srLevelColorStrong]);

export const getSrLevelColor = (ratio: number): string => {
  return srLevelColorScale(ratio).hex('rgba');
};

export const srLevelLineStyle: LineStyle = LineStyle.Dashed;

export const srLevelLineWidth: LineWidth = 1;

export const srLevelLineWidthStrong: LineWidth = 2;

export const srLevelLineWidthSuperStrong: LineWidth = 3;
