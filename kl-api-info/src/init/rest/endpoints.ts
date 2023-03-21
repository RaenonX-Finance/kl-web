import {restAddOptionsOiHandler} from '../../endpoints/rest/optionsOi';
import {restAddPingHandler} from '../../endpoints/rest/ping';


export const bindRestEndpointHandlers = () => {
  restAddPingHandler();
  restAddOptionsOiHandler();
};
