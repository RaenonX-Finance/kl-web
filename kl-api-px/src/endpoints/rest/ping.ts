import {ApiPath} from 'kl-web-common/enums/endpoints';

import {RestApiServer} from '../../const';


export const restAddPingHandler = () => {
  RestApiServer.get(ApiPath.Ping, async () => 'pong\n');
};
