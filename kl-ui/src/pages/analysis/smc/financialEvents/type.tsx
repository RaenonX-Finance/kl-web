import {FinancialEventsRequest} from 'kl-web-common/models/api/info/financialEvents';

import {ApiRequestRequiresTokenOpts} from '../../../../utils/api/common/types';


export type FinancialEventsRequestParams = FinancialEventsRequest;

export type FinancialEventsFetchPayload = FinancialEventsRequestParams & ApiRequestRequiresTokenOpts;
