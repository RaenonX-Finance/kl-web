/* eslint-disable new-cap */
import {Static, Type} from '@sinclair/typebox';

import {PxEmaPeriodPairSchema} from './config/emaPair';


export const PxEmaConfigSchema = Type.Object({
  net: PxEmaPeriodPairSchema,
  strongSr: Type.Array(PxEmaPeriodPairSchema, {uniqueItems: true}),
});

export type PxEmaConfig = Static<typeof PxEmaConfigSchema>;

export const PxIndicatorConfigSchema = Type.Object({
  ema: PxEmaConfigSchema,
});

export type PxIndicatorConfig = Static<typeof PxIndicatorConfigSchema>;
