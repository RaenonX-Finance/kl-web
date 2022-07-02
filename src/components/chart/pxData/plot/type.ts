import {PriceLineOptions} from 'lightweight-charts';

import {PxDataBar} from '../../../../types/pxData';


export type ColorOverridder = (bar: PxDataBar) => string;

export type SrLevelCommonOptions = Omit<PriceLineOptions, 'price' | 'color' | 'axisLabelVisible'>;

