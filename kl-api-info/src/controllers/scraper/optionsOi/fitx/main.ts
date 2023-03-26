import {expiryTypes} from './const';
import {scrapeFitxOptionsOiSingle} from './single';
import {OptionsOiScarpingFunction} from '../type';


export const scrapeFitxOptionsOi: OptionsOiScarpingFunction = (date) => {
  return Promise.all(expiryTypes.map((expiryType) => scrapeFitxOptionsOiSingle(date, expiryType)));
};
