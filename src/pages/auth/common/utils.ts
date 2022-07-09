import {AxiosResponse} from 'axios';

import {authErrorTranslation} from './const';
import {isTranslatedErrorDetail} from './type';


export const getErrorFromResponse = (response: AxiosResponse) => {
  const detail = response.data?.detail;

  return isTranslatedErrorDetail(detail) ? authErrorTranslation[detail] : null;
};
