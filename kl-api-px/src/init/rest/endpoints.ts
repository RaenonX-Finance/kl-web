import {restAddInitAppRequestHandler} from '../../endpoints/rest/initApp';
import {restAddPxInitRequestHandler} from '../../endpoints/rest/initPx';
import {restAddPingHandler} from '../../endpoints/rest/ping';
import {restAddPxRequestHandler} from '../../endpoints/rest/px';


export const bindRestEndpointHandlers = () => {
  restAddPingHandler();
  restAddPxRequestHandler();
  restAddPxInitRequestHandler();
  restAddInitAppRequestHandler();
};
