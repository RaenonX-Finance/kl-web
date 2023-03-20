import {restAddPingHandler} from '../../endpoints/rest/ping';


export const bindRestEndpointHandlers = () => {
  restAddPingHandler();
};
