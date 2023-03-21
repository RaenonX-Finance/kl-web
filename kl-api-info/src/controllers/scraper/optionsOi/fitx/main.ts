import {load} from 'cheerio';
import {OptionsOi} from 'kl-web-common/models/api/info/optionsOi';
import {dateOnlyToString} from 'kl-web-common/utils/date';
import {nowMs} from 'kl-web-common/utils/logging';

import {getOiValues} from './oiValues';
import {Logger} from '../../../../const';
import {OptionsOiScarpingFunction} from '../type';


// TODO: `scrapeFitxOptionsOiData` should only take +/- 15 strikes from current
export const scrapeFitxOptionsOiData: OptionsOiScarpingFunction = async (date) => {
  const startHttpReq = nowMs();

  const dateString = dateOnlyToString(date);
  const response = await fetch(
    `https://www.optree.tw/home/tools/option_t?date=${dateString}&item_type=week`,
  );

  const html = await response.text();

  const elapsedHttpReq = nowMs() - startHttpReq;
  const startScrape = nowMs();

  const data: OptionsOi[] = [];

  const $ = load(html);

  const table = $('div:nth-child(4) table');

  const contractSymbol = table
    .children('thead').children('tr').eq(0).children('th').eq(1)
    .contents().last().text().trim();

  table.children('tbody').eq(0).children('tr')
    .each((_, row) => {
      const rowCells = $(row).children();

      data.push({
        call: getOiValues($(rowCells[6])),
        put: getOiValues($(rowCells[15])),
        strike: Number($(rowCells[8])
          .children('p')
          .text()
          .trim()),
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
    },
    'Completed scraping FITX Options OI data at %s in %s ms (HTTP: %s ms / Scrape: %s ms)',
    dateString, (elapsedHttpReq + elapsedScrape).toFixed(2), elapsedHttpReq.toFixed(2), elapsedScrape.toFixed(2),
  );

  return [{contractSymbol, data}];
};
