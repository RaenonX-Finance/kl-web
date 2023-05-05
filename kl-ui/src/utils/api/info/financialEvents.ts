import {AxiosResponse} from 'axios';
import {InfoApiPath} from 'kl-web-common/enums/endpoints';
import {
  FinancialEventHistoryData,
  FinancialEventHistoryRequest,
} from 'kl-web-common/models/api/info/financialEventHistory';
import {FinancialEventData, FinancialEventsRequest} from 'kl-web-common/models/api/info/financialEvents';

import {infoApiGet} from '../common/get';
import {ApiRequestRequiresTokenOpts, ApiRetryableRequestOpts} from '../common/types';


type ApiGetFinancialEventsOpts = ApiRequestRequiresTokenOpts & FinancialEventsRequest & ApiRetryableRequestOpts;

export const apiGetFinancialEvents = ({
  token,
  onRetryAttempt,
  onRetrySuccess,
  ...params
}: ApiGetFinancialEventsOpts): Promise<AxiosResponse<FinancialEventData>> => (
  infoApiGet({
    apiPath: InfoApiPath.FinancialEvents,
    token,
    onRetryAttempt,
    onRetrySuccess,
    params,
  })
);

type ApiGetEventHistoryOpts = FinancialEventHistoryRequest & ApiRetryableRequestOpts;

export const apiGetEventHistory = ({
  symbol,
}: ApiGetEventHistoryOpts): Promise<AxiosResponse<FinancialEventHistoryData>> => (
  infoApiGet({
    apiPath: InfoApiPath.FinancialEventHistory,
    params: {
      symbol,
    },
  })
);
