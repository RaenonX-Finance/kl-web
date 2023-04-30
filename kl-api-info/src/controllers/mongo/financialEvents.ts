import {DataScraperOpts} from './type';
import {scrapeFinancialEvents} from '../scraper/financialEvents/main';
import {FinancialEvents} from '../scraper/financialEvents/type';


type GetFinancialEventsOpts = DataScraperOpts;

export const getFinancialEvents = async (opts: GetFinancialEventsOpts): Promise<FinancialEvents | null> => {
  // TODO: Get then store to DB (cache impl)
  return await scrapeFinancialEvents(opts);
};
