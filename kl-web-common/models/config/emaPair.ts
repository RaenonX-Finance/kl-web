/* eslint-disable new-cap */
import {Static, Type} from '@sinclair/typebox';


export const PxEmaPeriodPairSchema = Type.Object({
  fast: Type.Integer({exclusiveMinimum: 0}),
  slow: Type.Integer({exclusiveMinimum: 0}),
});

export type PxEmaPeriodPair = Static<typeof PxEmaPeriodPairSchema>;
