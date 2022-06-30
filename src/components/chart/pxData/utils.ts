import {PxDataEmaPeriodPair} from '../../../types/pxData';
import {PxChartEmaColorChangeKey} from './type';


export const makeEmaColorChangeKey = ({
  fast, slow,
}: PxDataEmaPeriodPair): PxChartEmaColorChangeKey => `emaColorChangeF${fast}S${slow}`;
