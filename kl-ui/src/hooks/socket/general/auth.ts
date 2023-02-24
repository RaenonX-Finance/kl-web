import React from 'react';

import {useSession} from 'next-auth/react';

import {GeneralSocket, PxCheckAuthMessage} from './type';
import {useNextAuthCall} from '../../auth';


const AUTH_CHECK_TIMEOUT_MS = 10000;
const AUTH_CHECK_INTERVAL_MS = 20000;

type UsePxInitHandlerOpts = {
  socket: GeneralSocket | undefined,
};

export const useAuthHandler = ({socket}: UsePxInitHandlerOpts) => {
  const {data} = useSession();
  const {signIn} = useNextAuthCall();
  const timeoutId = React.useRef<number>();
  const intervalId = React.useRef<number>();

  const clearTimeout = () => window.clearTimeout(timeoutId.current);
  const onDisconnect = () => {
    clearTimeout();
    window.clearInterval(intervalId.current);
  };

  // Hooks
  React.useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('disconnect', onDisconnect);
    socket.on('auth', clearTimeout);

    intervalId.current = window.setInterval(() => {
      const message: PxCheckAuthMessage = {token: data?.user?.token};
      socket.emit('auth', message);

      timeoutId.current = window.setTimeout(signIn, AUTH_CHECK_TIMEOUT_MS);
    }, AUTH_CHECK_INTERVAL_MS);

    return () => {
      socket.off('disconnect', onDisconnect);
      socket.off('auth', clearTimeout);
      window.clearInterval(intervalId.current);
      window.clearTimeout(timeoutId.current);
    };
  }, [socket]);
};
