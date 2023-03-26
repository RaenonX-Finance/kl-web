import {load} from 'cheerio';
import {OptionsOi, OptionsOiSingleData} from 'kl-web-common/models/api/info/optionsOi';
import {DateOnly} from 'kl-web-common/models/dateOnly';
import {dateOnlyToString} from 'kl-web-common/utils/date';
import {nowMs} from 'kl-web-common/utils/logging';
import {getNumber} from 'kl-web-common/utils/parse';

import {getOiValues} from './oiValues';
import {ExpiryType} from './type';
import {isStrikeInRange} from './utils';
import {Logger} from '../../../../const';


export const scrapeFitxOptionsOiSingle = async (date: DateOnly, type: ExpiryType): Promise<OptionsOiSingleData> => {
  const startHttpReq = nowMs();

  const dateString = dateOnlyToString(date);
  const response = await fetch(
    `https://www.optree.tw/home/tools/option_t?date=${dateString}&item_type=${type}`,
  );

  if (!response.ok) {
    Logger.error({date}, 'FITX Options OI at %s unavailable', dateString);
    throw new Error('Data unavailable');
  }

  const html = await response.text();

  const elapsedHttpReq = nowMs() - startHttpReq;
  const startScrape = nowMs();

  const data: OptionsOi[] = [];

  const $ = load(html);

  const currentPx = getNumber({
    str: $('div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(2) > span')
      .text().trim().split('（', 1)[0],
    onNaN: (str) => Logger.error({stringToParse: str}, 'Unable to convert current Px to number (%s)', str),
    onNaNReturn: null,
  });

  if (!currentPx) {
    throw new Error('Unable to convert current Px to number (check log for details)');
  }

  const table = $('div:nth-child(4) table');

  const contractSymbol = table
    .children('thead').children('tr').eq(0).children('th').eq(1)
    .contents().last().text().trim();

  table.children('tbody').eq(0).children('tr')
    .each((_, row) => {
      const rowCells = $(row).children();

      const strike = getNumber({
        str: $(rowCells[8])
          .children('p')
          .text()
          .trim(),
        onNaN: (str) => Logger.warn({strikeToParse: str}, 'Unable to convert strike to number (%s)', str),
        onNaNReturn: null,
      });

      if (!strike || !isStrikeInRange(strike, currentPx)) {
        return;
      }

      data.push({
        call: getOiValues($(rowCells[6])),
        put: getOiValues($(rowCells[15])),
        strike,
      });
    });

  const elapsedScrape = nowMs() - startScrape;

  Logger.info(
    {
      elapsed: {
        http: elapsedHttpReq,
        scrape: elapsedScrape,
      },
      date,
      type,
    },
    'Completed scraping FITX Options OI data at %s of %s in %s ms (HTTP: %s ms / Scrape: %s ms)',
    dateString, type, (elapsedHttpReq + elapsedScrape).toFixed(2), elapsedHttpReq.toFixed(2), elapsedScrape.toFixed(2),
  );

  return {contractSymbol, currentPx, lastUpdate: new Date().toISOString(), data};
};
