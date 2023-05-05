import {FinancialEventData, FinancialEventEntryFromApi} from 'kl-web-common/models/api/info/financialEvents';
import {DateOnly} from 'kl-web-common/models/dateOnly';
import {dateOnlyToString} from 'kl-web-common/utils/date';

import {toFinancialEventData} from './utils';
import {Logger} from '../../../const';


type ScrapeFinancialEventsOpts = {
  date: DateOnly,
};

export const scrapeFinancialEvents = async ({date}: ScrapeFinancialEventsOpts): Promise<FinancialEventData> => {
  const dateString = dateOnlyToString(date);
  const response = await fetch(
    `https://www.dailyfxasia.com/cn/calendar/events/${dateString}`,
  );

  if (!response.ok) {
    Logger.error({date}, 'Financial events at %s unavailable', dateString);
    throw new Error(`Financial events at ${dateString} unavailable`);
  }

  return toFinancialEventData(await response.json() as FinancialEventEntryFromApi[]);
};
