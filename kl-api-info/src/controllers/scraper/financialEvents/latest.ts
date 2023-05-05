import {FinancialEventData, FinancialEventEntryFromApi} from 'kl-web-common/models/api/info/financialEvents';

import {toFinancialEventData} from './utils';
import {Logger} from '../../../const';


export const scrapeLatestEvents = async (): Promise<FinancialEventData> => {
  const response = await fetch(`https://www.dailyfxasia.com/cn/calendar/latest`);

  if (!response.ok) {
    Logger.error('Latest events unavailable');
    throw new Error('Latest events unavailable');
  }

  return toFinancialEventData(await response.json() as FinancialEventEntryFromApi[]);
};
