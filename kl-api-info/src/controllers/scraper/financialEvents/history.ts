import {
  FinancialEventHistoryData,
  FinancialEventHistoryEntryFromApi,
} from 'kl-web-common/models/api/info/financialEventHistory';

import {Logger} from '../../../const';


type ScrapeFinancialEventHistoryOpts = {
  symbol: string,
};

export const scrapeFinancialEventHistory = async ({
  symbol,
}: ScrapeFinancialEventHistoryOpts): Promise<FinancialEventHistoryData> => {
  const response = await fetch(
    `https://www.dailyfxasia.com/cn/calendar/historical/${symbol}`,
  );

  if (!response.ok) {
    Logger.error({symbol}, 'Financial event history of %s unavailable', symbol);
    throw new Error(`Financial event history of ${symbol} unavailable`);
  }

  const json = await response.json() as FinancialEventHistoryEntryFromApi[];

  // Dates returned from the API won't have `Z` postfix, which causes timezone issue for the later processing
  return json.map(({date, ...data}) => ({
    date: `${date}:00.000Z`,
    ...data,
  }));
};
