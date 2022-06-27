import chroma from 'chroma-js';
import {LineStyle, LineWidth} from 'lightweight-charts';


export const bullColor = '#ef5350';

export const bearColor = '#26a69a';

export const avgCostColor = 'rgba(240, 240, 240, 0.7)';

export const longColor = 'rgba(28, 107, 255, 0.7)';

export const shortColor = 'rgba(255, 66, 28, 0.7)';

export const longLighterColor = 'rgb(92, 149, 255)';

export const shortLighterColor = 'rgb(255, 119, 92)';

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
