import {FinancialEventData, FinancialEventEntryFromApi} from 'kl-web-common/models/api/info/financialEvents';
import {DateOnly} from 'kl-web-common/models/dateOnly';
import {dateOnlyToString} from 'kl-web-common/utils/date';

import {toFinancialEventData} from './utils';
import {Logger} from '../../../const';


type ScrapeFinancialEventsOpts = {
  date: DateOnly,
};

export const scrapeFinancialEvents = async (opts: ScrapeFinancialEventsOpts): Promise<FinancialEventData> => {
  const {date} = opts;
  const dateString = dateOnlyToString(date);
  let response;

  try {
    response = await fetch(
      `https://www.dailyfxasia.com/cn/calendar/events/${dateString}`,
    );
  } catch (error) {
    Logger.error(
      {date, error},
      'Caught error when trying to fetch financial events at %s (%s) - retry in 5s',
      dateString, error,
    );
    await new Promise((resolve) => setTimeout(resolve, 5000));

    return scrapeFinancialEvents(opts);
  }

  if (!response.ok) {
    Logger.error({date}, 'Financial events at %s unavailable', dateString);
    throw new Error(`Financial events at ${dateString} unavailable`);
  }

  return toFinancialEventData(await response.json() as FinancialEventEntryFromApi[]);
};
