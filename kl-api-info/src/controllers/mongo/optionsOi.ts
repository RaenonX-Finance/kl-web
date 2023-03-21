import {OptionsOiData} from 'kl-web-common/models/api/info/optionsOi';
import {DateOnly} from 'kl-web-common/models/dateOnly';
import {dateOnlyToString} from 'kl-web-common/utils/date';
import groupBy from 'lodash/groupBy';

import {infoOptionsOi, infoOptionsOiLastUpdate} from './const';
import {Logger} from '../../const';
import {OptionsOiExpirySec} from '../../env';
import {optionsOiScrapingFunc} from '../scraper/optionsOi/const';


type GetOptionsOiOpts = {
  symbol: string,
  date: DateOnly,
  forceScrape?: boolean,
};

const getOptionsOiFromDb = async ({symbol, date}: GetOptionsOiOpts): Promise<OptionsOiData> => {
  const data = groupBy(
    await infoOptionsOi.find({symbol, date}).toArray(),
    ({contractSymbol}) => contractSymbol,
  );

  return Object.entries(data).map(([contractSymbol, data]) => ({contractSymbol, data}));
};

export const getOptionsOi = async (opts: GetOptionsOiOpts): Promise<OptionsOiData> => {
  const {symbol, date, forceScrape} = opts;
  const dateString = dateOnlyToString(date);

  Logger.info(opts, 'Getting Options OI of %s at %s (force scrape: %s)', symbol, dateString, forceScrape);

  const scrapeFunc = optionsOiScrapingFunc[symbol];

  if (!scrapeFunc) {
    Logger.info(
      {symbol, result: 'noScrapeFunc'},
      'No Options OI data for %s because there is no corresponding scraping function',
      symbol,
    );
    return [];
  }

  if (!forceScrape) {
    const lastUpdate = await infoOptionsOiLastUpdate.findOne({symbol, date});

    if (lastUpdate && (new Date().getTime() - lastUpdate.lastUpdate.getTime()) / 1000 < OptionsOiExpirySec) {
      Logger.info(
        {...opts, lastUpdate: lastUpdate.lastUpdate, result: 'cached'},
        'Returning cached Options OI of %s at %s (last updated at %s)',
        symbol, dateString, lastUpdate.lastUpdate,
      );
      return await getOptionsOiFromDb(opts);
    }
  }

  const scrapedOptionsOi = await scrapeFunc(date);

  await infoOptionsOi.deleteMany({
    symbol,
    date,
    contractSymbol: {$in: scrapedOptionsOi.map(({contractSymbol}) => contractSymbol)},
  });
  await Promise.all([
    infoOptionsOi.insertMany(scrapedOptionsOi.flatMap(({contractSymbol, data}) => (
      data.map((oiData) => ({...oiData, contractSymbol, symbol, date}))
    ))),
    infoOptionsOiLastUpdate.updateOne({symbol, date}, {$set: {lastUpdate: new Date()}}, {upsert: true}),
  ]);

  Logger.info({symbol, date, result: 'scraped'}, 'Returning scraped Options OI data of %s at %s', symbol, dateString);
  return scrapedOptionsOi;
};
