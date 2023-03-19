/* eslint-disable new-cap */
import {Static, Type} from '@sinclair/typebox';

import {PxIndicatorConfigSchema} from './pxConfig';
import {PxHistorySingleSchemaBase} from './pxHistory';
import {PxMarketSingleSchema} from './pxMarket';
import {PxContractSchema} from './pxMeta';


export const PxDataSchema = Type.Object({
  ...PxHistorySingleSchemaBase,
  periodSec: Type.Integer({exclusiveMinimum: 0}),
  contract: PxContractSchema,
  latestMarket: PxMarketSingleSchema,
  indicator: PxIndicatorConfigSchema,
});

export type PxData = Static<typeof PxDataSchema>;
