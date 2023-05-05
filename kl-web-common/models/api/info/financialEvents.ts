/* eslint-disable new-cap */
import {Static, TString, Type} from '@sinclair/typebox';

import {InfoRequestSchema} from './common';
import {FinancialEventHistoryEntry} from './financialEventHistory';
import {ISOTimestampTillMinuteNoZ, ISOTimestampUtc} from '../../../types/time';
import {ChangeTypeOfKeysOnValueType} from '../../../utils/types';
import {DateOnly} from '../../dateOnly';
import {IsoTimestampUtcSchema} from '../../schema/timestamp';


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
  date: IsoTimestampUtcSchema,
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
  lastUpdate: IsoTimestampUtcSchema,
});

export type FinancialEventEntry = Static<typeof FinancialEventEntrySchema>;

export type FinancialEventEntryFromApi = ChangeTypeOfKeysOnValueType<
  FinancialEventEntry,
  ISOTimestampUtc,
  ISOTimestampTillMinuteNoZ
>;

export const FinancialEventDataSchema = Type.Array(FinancialEventEntrySchema);

export type FinancialEventData = Static<typeof FinancialEventDataSchema>;

export type FinancialEventEntryModel = ChangeTypeOfKeysOnValueType<
  FinancialEventHistoryEntry,
  ISOTimestampUtc,
  Date
>;

export type FinancialEventsMetaModel = {
  date: DateOnly,
  lastUpdate: Date,
};
