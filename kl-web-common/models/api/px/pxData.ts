/* eslint-disable new-cap */
import {Static, Type} from '@sinclair/typebox';

import {PxIndicatorConfigSchema} from './pxConfig';
import {PxMomentumIndexSchema} from './pxDataBar';
import {PxHistorySingleSchemaBase} from './pxHistory';
import {PxMarketSingleSchema} from './pxMarket';
import {PxContractSchema} from './pxMeta';
import {Nullable} from '../../schema/nullable';


const PxDataSchemaBase = {
  ...PxHistorySingleSchemaBase,
  periodSec: Type.Integer({exclusiveMinimum: 0}),
  contract: PxContractSchema,
  momentum: PxMomentumIndexSchema,
  indicator: PxIndicatorConfigSchema,
};

export const PxDataInitSchema = Type.Object(PxDataSchemaBase);

export type PxDataInit = Static<typeof PxDataInitSchema>;

export const PxDataSchema = Type.Object({
  ...PxDataSchemaBase,
  latestMarket: Nullable(PxMarketSingleSchema),
});

export type PxData = Static<typeof PxDataSchema>;
