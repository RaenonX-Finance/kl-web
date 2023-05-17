import {dateOnlyToString, toDateOnly} from 'kl-web-common/utils/date';

import {Logger} from '../../const';
import {updateFinancialEventsInDb} from '../../controllers/mongo/financialEvents';
import {scrapeFinancialEvents} from '../../controllers/scraper/financialEvents/events';
import {InfoSocketEmitter} from '../../types/socket';


export const pollCalendarEvents = async (emitter: InfoSocketEmitter) => {
  const date = toDateOnly(new Date());

  Logger.info({date}, 'Scraping calendar events at %s', dateOnlyToString(date));
  const financialEvents = await scrapeFinancialEvents({date});

  if (!financialEvents.length) {
    return;
  }

  const [result] = await updateFinancialEventsInDb({financialEvents, date});

  const updatedCount = result.modifiedCount + result.upsertedCount;

  Logger.info({date, updatedCount}, '%d calendar events updated (%s)', updatedCount, dateOnlyToString(date));

  if (!updatedCount) {
    return;
  }

  emitter.to(dateOnlyToString(date)).emit('eventUpdated', financialEvents);
};
