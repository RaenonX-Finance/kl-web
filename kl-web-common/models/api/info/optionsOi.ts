/* eslint-disable new-cap */
import {Static, Type} from '@sinclair/typebox';

import {DateOnly, DateOnlySchemaBase} from '../../dateOnly';


export const OptionsOiRequestSchema = Type.Object({
  ...DateOnlySchemaBase,
  symbol: Type.String(),
  forceScrape: Type.Optional(Type.Boolean()),
});

export type OptionsOiRequest = Static<typeof OptionsOiRequestSchema>;

export const OptionsOiSingleSideSchema = Type.Object({
  oiCurrent: Type.Integer({minimum: 0}),
  oiChangeVal: Type.Integer(),
});

export type OptionsOiSingleSide = Static<typeof OptionsOiSingleSideSchema>;

export const OptionsOiSchema = Type.Object({
  call: OptionsOiSingleSideSchema,
  put: OptionsOiSingleSideSchema,
  strike: Type.Number({exclusiveMinimum: 0}),
});

export type OptionsOi = Static<typeof OptionsOiSchema>;

export const OptionsOiSingleDataSchema = Type.Object({
  contractSymbol: Type.String(),
  currentPx: Type.Number({exclusiveMinimum: 0}),
  lastUpdate: Type.String({format: 'date-time'}),
  data: Type.Array(OptionsOiSchema),
});

export type OptionsOiSingleData = Static<typeof OptionsOiSingleDataSchema>;

export const OptionsOiDataSchema = Type.Array(OptionsOiSingleDataSchema);

export type OptionsOiData = Static<typeof OptionsOiDataSchema>;

export type OptionsOiModel = OptionsOi & {
  symbol: string,
  contractSymbol: string,
  date: DateOnly,
};

export type OptionsOiMetaModel = {
  symbol: string,
  date: DateOnly,
  px: number,
  lastUpdate: Date,
};
