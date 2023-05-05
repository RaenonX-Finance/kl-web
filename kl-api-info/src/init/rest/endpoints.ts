import {restAddFinancialEventHistoryHandler} from '../../endpoints/rest/financialEventHistory';
import {restAddFinancialEventsHandler} from '../../endpoints/rest/financialEvents';
import {restAddOptionsOiHandler} from '../../endpoints/rest/optionsOi';
import {restAddPingHandler} from '../../endpoints/rest/ping';


export const bindRestEndpointHandlers = () => {
  restAddPingHandler();
  restAddOptionsOiHandler();
  restAddFinancialEventsHandler();
  restAddFinancialEventHistoryHandler();
};
