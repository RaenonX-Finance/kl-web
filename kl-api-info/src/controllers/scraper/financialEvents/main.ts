import {FinancialEventData} from 'kl-web-common/models/api/info/financialEvents';
import {DateOnly} from 'kl-web-common/models/dateOnly';
import {dateOnlyToString} from 'kl-web-common/utils/date';

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

  const json = await response.json() as FinancialEventData;

  // Dates returned from the API won't have `Z` postfix, which causes timezone issue for the later processing
  return json.map(({date, lastUpdate, ...data}) => ({
    date: `${date}Z`,
    lastUpdate: `${lastUpdate}Z`,
    ...data,
  }));
};
