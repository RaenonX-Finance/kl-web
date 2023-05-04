/* eslint-disable new-cap */
import {Static, TString, Type} from '@sinclair/typebox';

import {InfoRequestSchema} from './common';
import {DateOnly} from '../../dateOnly';


export const FinancialEventsRequestSchema = InfoRequestSchema;

export type FinancialEventsRequest = Static<typeof FinancialEventsRequestSchema>;

export interface TEventImportance extends TString {
  static: 'low' | 'medium' | 'high';
}

export const EventImportanceSchema = Type.Unsafe<Static<TEventImportance>>(Type.String({
  type: 'string',
  pattern: 'low|medium|high',
}));

export type EventImportance = Static<typeof EventImportanceSchema>;

export const FinancialEventEntrySchema = Type.Object({
  id: Type.Number({minimum: 1}),
  ticker: Type.String(),
  symbol: Type.String(),
  date: Type.String({format: 'date-time'}),
  title: Type.String(),
  description: Type.String(),
  importance: EventImportanceSchema,
  previous: Type.String(),
  forecast: Type.String(),
  country: Type.String(),
  actual: Type.String(),
  allDayEvent: Type.Boolean(),
  currency: Type.String(),
  reference: Type.String(),
  revised: Type.String(),
  economicMeaning: Type.Object({
    actual: Type.String(),
    previous: Type.String(),
  }),
  lastUpdate: Type.String({format: 'date-time'}),
});

export type FinancialEventEntry = Static<typeof FinancialEventEntrySchema>;

export const FinancialEventDataSchema = Type.Array(FinancialEventEntrySchema);

export type FinancialEventData = Static<typeof FinancialEventDataSchema>;

export type FinancialEventEntryModel = Omit<FinancialEventEntry, 'date' | 'lastUpdate'> & {
  date: Date,
  lastUpdate: Date,
};

export type FinancialEventsMetaModel = {
  date: DateOnly,
  lastUpdate: Date,
};
