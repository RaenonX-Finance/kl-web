import {setIntervalAsync} from 'set-interval-async/dynamic';

import {WorkerTask} from './type';
import {InfoSocketEmitter} from '../../types/socket';
import {pollCalendarEvents} from '../../workers/financialEvent/calendar';
import {pollLatestEvents} from '../../workers/financialEvent/latest';


export const scheduleFilter = async (fnToRun: WorkerTask, emitter: InfoSocketEmitter) => {
  const now = new Date();
  const second = now.getSeconds();

  if (second !== 1 && second !== 5 && second !== 25) {
    return;
  }

  await fnToRun(emitter);
};

export const scheduleWorker = (emitter: InfoSocketEmitter) => {
  setIntervalAsync(() => scheduleFilter(pollCalendarEvents, emitter), 1000);
  setIntervalAsync(() => scheduleFilter(pollLatestEvents, emitter), 1000);
};
