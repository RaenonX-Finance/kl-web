import {OptionsOiData} from 'kl-web-common/models/api/info/optionsOi';
import {DateOnly} from 'kl-web-common/models/dateOnly';
import {dateOnlyToString} from 'kl-web-common/utils/date';
import groupBy from 'lodash/groupBy';

import {infoOptionsOi, infoOptionsOiMeta} from './const';
import {Logger} from '../../const';
import {OptionsOiExpirySec} from '../../env';
import {optionsOiScrapingFunc} from '../scraper/optionsOi/const';


type GetOptionsOiOpts = {
  symbol: string,
  date: DateOnly,
  forceScrape?: boolean,
};

const getOptionsOiFromDb = async ({symbol, date}: GetOptionsOiOpts): Promise<OptionsOiData | null> => {
  const [meta, oiData] = await Promise.all([
    infoOptionsOiMeta.findOne({symbol, date}),
    infoOptionsOi.find({symbol, date}, {sort: ['strike', -1]}).toArray(),
  ]);

  if (!meta) {
    return null;
  }

  return Object
    .entries(groupBy(oiData, ({contractSymbol}) => contractSymbol))
    .map(([contractSymbol, data]) => ({
      contractSymbol,
      data,
      currentPx: meta.px,
      lastUpdate: meta.lastUpdate.toISOString(),
    }));
};

export const getOptionsOi = async (opts: GetOptionsOiOpts): Promise<OptionsOiData | null> => {
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
    const meta = await infoOptionsOiMeta.findOne({symbol, date});

    if (meta && (new Date().getTime() - meta.lastUpdate.getTime()) / 1000 < OptionsOiExpirySec) {
      const dataInDb = await getOptionsOiFromDb(opts);

      if (dataInDb) {
        Logger.info(
          {...opts, lastUpdate: meta.lastUpdate, result: 'cached'},
          'Returning cached Options OI of %s at %s (last updated at %s)',
          symbol, dateString, meta.lastUpdate,
        );

        return dataInDb;
      }
    }
  }

  const scrapedOptionsOi = await scrapeFunc(date);

  if (!scrapedOptionsOi.length) {
    Logger.info(
      {symbol, result: 'noResult'},
      'No Options OI data available for %s at %s',
      symbol, dateString,
    );
    return null;
  }

  await infoOptionsOi.deleteMany({
    symbol,
    date,
    contractSymbol: {$in: scrapedOptionsOi.map(({contractSymbol}) => contractSymbol)},
  });
  await Promise.all([
    infoOptionsOi.insertMany(scrapedOptionsOi.flatMap(({contractSymbol, data}) => (
      data.map((oiData) => ({...oiData, contractSymbol, symbol, date}))
    ))),
    infoOptionsOiMeta.updateOne(
      {symbol, date},
      {$set: {lastUpdate: new Date(), px: scrapedOptionsOi[0].currentPx}},
      {upsert: true},
    ),
  ]);

  Logger.info({symbol, date, result: 'scraped'}, 'Returning scraped Options OI data of %s at %s', symbol, dateString);
  return scrapedOptionsOi;
};
