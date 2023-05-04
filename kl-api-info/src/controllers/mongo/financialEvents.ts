import {FinancialEventData, FinancialEventEntryModel} from 'kl-web-common/models/api/info/financialEvents';
import {addDays, dateOnlyToDate, dateOnlyToString} from 'kl-web-common/utils/date';

import {infoFinancialEvents, infoFinancialEventsMeta} from './const';
import {DataScraperOpts} from './type';
import {Logger} from '../../const';
import {FinancialEventsExpirySec} from '../../env';
import {scrapeFinancialEvents} from '../scraper/financialEvents/main';


type GetFinancialEventsOpts = DataScraperOpts;

const getFinancialEventsFromDb = async ({
  date,
}: GetFinancialEventsOpts): Promise<FinancialEventEntryModel[] | null> => {
  const baseDate = dateOnlyToDate(date);
  const [meta, financialEvents] = await Promise.all([
    infoFinancialEventsMeta.findOne({date}),
    // Needs to get the data from (date - 1D) to (date + 2D)
    // so the data shown at the UI after applying timezone filter is guaranteed in a 24 hrs range
    // Ending limit being +2 to include every event in the next day
    infoFinancialEvents.find(
      {date: {$gte: addDays(baseDate, -1), $lt: addDays(baseDate, 2)}},
      {sort: ['date', 1]},
    ).toArray(),
  ]);

  if (!meta) {
    return null;
  }

  return financialEvents;
};

export const getFinancialEvents = async (opts: GetFinancialEventsOpts): Promise<FinancialEventData | null> => {
  const {date, forceScrape, onLog} = opts;
  const dateString = dateOnlyToString(date);

  const onLogInternal: GetFinancialEventsOpts['onLog'] = (log) => {
    if (onLog) {
      onLog(log);
    }
  };

  const scrapeEvents = async (): Promise<boolean> => {
    const financialEvents = await scrapeFinancialEvents(opts);

    if (!financialEvents.length) {
      Logger.info(
        {date, result: 'noResult'},
        'No financial events available at %s',
        dateString,
      );
      onLogInternal(`No financial events data available at ${dateString}`);
      return false;
    }

    Logger.info({date, result: 'scraped'}, 'Scraped financial events at %s', dateString);
    onLogInternal(`Scraping financial events at ${dateString}`);

    await infoFinancialEvents.deleteMany({id: {$in: financialEvents.map(({id}) => id)}});
    await Promise.all([
      infoFinancialEvents.insertMany(financialEvents.map(({date, lastUpdate, ...event}) => ({
        ...event,
        date: new Date(date),
        lastUpdate: new Date(lastUpdate),
      }))),
      infoFinancialEventsMeta.updateOne(
        {date},
        {$set: {lastUpdate: new Date()}},
        {upsert: true},
      ),
    ]);
    return true;
  };

  Logger.info(opts, 'Getting financial events at %s (force scrape: %s)', dateString, forceScrape);
  onLogInternal(`Getting financial events at ${dateString} (force scrape: ${forceScrape})`);

  let dataAvailable;

  if (forceScrape) {
    dataAvailable = await scrapeEvents();
  } else {
    const meta = await infoFinancialEventsMeta.findOne({date});

    if (!meta || (new Date().getTime() - meta.lastUpdate.getTime()) / 1000 > FinancialEventsExpirySec) {
      dataAvailable = await scrapeEvents();
    } else {
      dataAvailable = true;
      Logger.info(
        {...opts, lastUpdate: meta.lastUpdate, result: 'cached'},
        'Found cached financial events at %s (last updated at %s)',
        dateString, meta.lastUpdate,
      );
      onLogInternal(
        `Found cached financial events at ${dateString} (last updated at ${meta.lastUpdate})`,
      );
    }
  }

  if (!dataAvailable) {
    return null;
  }

  const dataInDb = await getFinancialEventsFromDb(opts);

  Logger.info(
    {date, dataCount: dataInDb?.length},
    'Returning financial events at %s (%s)',
    dateString, dataInDb?.length,
  );
  onLogInternal(`Returning financial events at ${dateString} (${dataInDb?.length})`);

  if (!dataInDb) {
    return null;
  }

  return dataInDb.map(({date, lastUpdate, ...event}) => ({
    ...event,
    date: date.toISOString(),
    lastUpdate: lastUpdate.toISOString(),
  }));
};
