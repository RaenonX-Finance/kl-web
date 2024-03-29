import React from 'react';

import {useSession} from 'next-auth/react';

import {AccountSocket} from './type';
import {useNextAuthCall} from '../../auth';


const AUTH_CHECK_TIMEOUT_MS = 10000;
const AUTH_CHECK_INTERVAL_MS = 20000;

type UsePxInitHandlerOpts = {
  socket: AccountSocket | undefined,
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
      socket.emit('auth', {token: data?.user.token});

      timeoutId.current = window.setTimeout(() => {
        console.log('Auth poll failed, redirecting to sign in page');
        signIn();
      }, AUTH_CHECK_TIMEOUT_MS);
    }, AUTH_CHECK_INTERVAL_MS);

    return () => {
      socket.off('disconnect', onDisconnect);
      socket.off('auth', clearTimeout);
      window.clearInterval(intervalId.current);
      window.clearTimeout(timeoutId.current);
    };
  }, [socket]);
};
