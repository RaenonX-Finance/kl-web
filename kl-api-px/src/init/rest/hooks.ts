import {RestApiServer, SocketIoServer} from '../../const';


export const addFastifyHooks = () => {
  RestApiServer.addHook('onClose', async () => {
    SocketIoServer.close();
  });
};
