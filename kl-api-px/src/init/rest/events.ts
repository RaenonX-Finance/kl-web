import {RestApiServer} from '../../const';
import {bindSocketEvents} from '../socket/bind';


export const bindRestEventHandlers = () => {
  RestApiServer.ready((err) => {
    if (err) {
      throw err;
    }

    bindSocketEvents();
  });
};
