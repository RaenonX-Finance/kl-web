import {RestApiServer} from '../../const';
import {ApiPort} from '../../env';


export const runFastify = () => {
  RestApiServer.listen({port: ApiPort}, (err) => {
    if (!err) {
      return;
    }

    console.error(err);
    process.exit(1);
  });
};
