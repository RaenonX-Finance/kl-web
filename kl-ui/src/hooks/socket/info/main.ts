import React from 'react';

import {InfoSocket} from './type';
import {generateInfoSocketClient} from '../../../utils/socket';
import {useCommonSocketEventHandlers} from '../common/event/main';


export const useInfoSocket = (): InfoSocket | undefined => {
  const [socket, setSocket] = React.useState<InfoSocket>();

  useCommonSocketEventHandlers({
    name: '資訊',
    socket,
    deps: [],
  });

  // Hooks
  React.useEffect(() => {
    const socket = generateInfoSocketClient();
    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  return socket;
};
