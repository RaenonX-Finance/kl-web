import {PxApiPath} from 'kl-web-common/enums/endpoints';

import {RestApiServer} from '../../const';


export const restAddPingHandler = () => {
  RestApiServer.get(PxApiPath.Ping, async () => 'pong\n');
};
