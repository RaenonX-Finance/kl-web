import {DateOnly} from 'kl-web-common/models/dateOnly';


export type DataScraperOpts = {
  date: DateOnly,
  forceScrape?: boolean,
  onLog?: (log: string) => void,
};
