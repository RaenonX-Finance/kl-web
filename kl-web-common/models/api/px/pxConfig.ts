/* eslint-disable new-cap */
import {Type} from '@sinclair/typebox';

import {PxEmaPeriodPairSchema} from '../../config/emaPair';


export const PxEmaConfigSchema = Type.Object({
  net: PxEmaPeriodPairSchema,
  strongSr: Type.Array(PxEmaPeriodPairSchema, {uniqueItems: true}),
});

export const PxIndicatorConfigSchema = Type.Object({
  ema: PxEmaConfigSchema,
});
