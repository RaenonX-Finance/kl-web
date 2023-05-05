import {Static, Type} from '@sinclair/typebox';
import {ISOTimestampTillMinuteNoZ, ISOTimestampUtc} from 'kl-web-common/types/time';

import {ChangeTypeOfKeysOnValueType} from '../../../utils/types';
import {IsoTimestampUtcSchema} from '../../schema/timestamp';


export const FinancialEventHistoryRequestSchema = Type.Object({
  symbol: Type.String(),
});

export type FinancialEventHistoryRequest = Static<typeof FinancialEventHistoryRequestSchema>;

export const FinancialEventHistoryEntrySchema = Type.Object({
  date: IsoTimestampUtcSchema,
  value: Type.Number(),
});

export type FinancialEventHistoryEntry = Static<typeof FinancialEventHistoryEntrySchema>;

export type FinancialEventHistoryEntryFromApi = ChangeTypeOfKeysOnValueType<
  FinancialEventHistoryEntry,
  ISOTimestampUtc,
  ISOTimestampTillMinuteNoZ
>;

export const FinancialEventHistoryDataSchema = Type.Array(FinancialEventHistoryEntrySchema);

export type FinancialEventHistoryData = Static<typeof FinancialEventHistoryDataSchema>;
