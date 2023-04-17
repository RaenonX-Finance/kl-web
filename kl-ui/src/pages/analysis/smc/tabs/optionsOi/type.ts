import {OptionsOiRequest} from 'kl-web-common/models/api/info/optionsOi';


export type OptionsOiRequestParams = Pick<OptionsOiRequest, 'year' | 'month' | 'day' | 'forceScrape'>;

export type OptionsOiFetchPayload = OptionsOiRequestParams & {
  token: string,
};
