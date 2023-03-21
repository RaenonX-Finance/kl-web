import {scrapeFitxOptionsOiData} from './fitx/main';
import {OptionsOiScarpingFunction} from './type';


export const optionsOiScrapingFunc: {[securitySymbol in string]?: OptionsOiScarpingFunction} = {
  FITX: scrapeFitxOptionsOiData,
};
