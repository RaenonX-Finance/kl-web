import {FinancialEventData, FinancialEventEntryFromApi} from 'kl-web-common/models/api/info/financialEvents';


export const toFinancialEventData = (apiEntries: FinancialEventEntryFromApi[]): FinancialEventData => {
  // Dates returned from the API won't have `Z` postfix, which causes timezone issue for the later processing
  return apiEntries.map(({id, date, lastUpdate, ...data}) => ({
    id: parseInt(id),
    date: `${date}:00.000Z`,
    lastUpdate: `${lastUpdate}:00.000Z`,
    ...data,
  }));
};
