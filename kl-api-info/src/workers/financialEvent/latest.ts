import {Logger} from '../../const';
import {updateLatestEventsInDb} from '../../controllers/mongo/latestEvents';
import {scrapeLatestEvents} from '../../controllers/scraper/financialEvents/latest';
import {InfoSocketEmitter} from '../../types/socket';


export const pollLatestEvents = async (emitter: InfoSocketEmitter) => {
  Logger.info('Scraping latest events');
  const latestEvents = await scrapeLatestEvents();

  if (!latestEvents.length) {
    Logger.info('No latest events available');
    return;
  }

  const [result] = await updateLatestEventsInDb({financialEvents: latestEvents});

  const updatedCount = result.modifiedCount + result.upsertedCount;

  Logger.info({updatedCount}, '%d latest events updated', updatedCount);

  if (!updatedCount) {
    return;
  }

  emitter.emit('latestUpdated', latestEvents);
};
