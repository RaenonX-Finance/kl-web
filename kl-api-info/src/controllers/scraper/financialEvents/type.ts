import {ISOTimestampTillMinute} from 'kl-web-common/types/time';


export type EventImportance = 'low' | 'medium' | 'high';

export type FinancialEventEntry = {
  id: number,
  ticker: string,
  symbol: string,
  isoUtcTimestamp: ISOTimestampTillMinute,
  title: string,
  description: string,
  importance: EventImportance,
  previous: string,
  forecast: string,
  country: string,
  actual: string,
  allDayEvent: boolean,
  currency: string,
  reference: string,
  revised: string,
  economicMeaning: {
    actual: string,
    previous: string,
  },
  lastUpdate: ISOTimestampTillMinute,
};

export type FinancialEvents = FinancialEventEntry[];
