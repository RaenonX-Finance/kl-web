import {OptionsOiData} from 'kl-web-common/models/api/info/optionsOi';
import {DateOnly} from 'kl-web-common/models/dateOnly';


export type OptionsOiScarpingFunction = (date: DateOnly) => PromiseLike<OptionsOiData>;
