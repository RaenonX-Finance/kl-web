import {Logger, RestApiServer} from '../../const';
import {ApiHost, ApiPort} from '../../env';


export const runFastify = async () => {
  try {
    // `host` is needed for socket.io server to work
    await RestApiServer.listen({host: ApiHost, port: ApiPort});
    const addresses = RestApiServer.addresses();
    Logger.info(
      {addresses},
      'Server listening on %s',
      addresses.map(({address, family, port}) => `${address}:${port} (${family})`).join(', '),
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
