import React from 'react';

import {useSession} from 'next-auth/react';
import {Socket} from 'socket.io-client';

import {mergedDispatchers} from '../../../state/aggregated/dispatchers';
import {MergedDispatcherName} from '../../../state/aggregated/types';
import {errorDispatchers} from '../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../state/error/types';
import {useDispatch} from '../../../state/store';
import {InitData} from '../../../types/init';
import {SocketMessage} from '../../../types/socket';
import {generateSocketClient} from '../../../utils/socket';
import {useNextAuthCall} from '../../auth';
import {ensureStringMessage, useSocketEventHandler} from '../utils';
import {useAuthHandler} from './auth';
import {GeneralSocket} from './type';


export const useGeneralSocket = (): GeneralSocket | undefined => {
  const [socket, setSocket] = React.useState<GeneralSocket>();
  const {data: session} = useSession();
  const dispatch = useDispatch();
  const {signIn} = useNextAuthCall();
  useAuthHandler({socket});

  // System events
  const onConnectionError = (err: Error) => {
    console.error(err);
    dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: err.message}));
  };
  const onDisconnect = (reason: Socket.DisconnectReason) => {
    if (reason === 'io server disconnect') {
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: '連線已中斷。請檢查帳戶是否多開。'}));
    } else {
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: reason}));
    }
  };

  // Custom events
  const onInit = React.useCallback((message: SocketMessage) => {
    const initData: InitData = JSON.parse(ensureStringMessage(message));

    if (!session || !!session.error) {
      return;
    }

    dispatch(mergedDispatchers[MergedDispatcherName.INIT_APP](initData));
  }, []);
  const onError = useSocketEventHandler({
    dispatch,
    action: errorDispatchers[ErrorDispatcherName.UPDATE],
  });
  const onSignIn = (message: SocketMessage) => {
    if (typeof message !== 'string') {
      console.error(`Socket event [signIn] does not have [string] message: ${message}`);
      return;
    }

    dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message}));
    signIn();
  };

  // Hooks
  React.useEffect(() => {
    const socket = generateSocketClient('/');

    // System events
    socket.on('connect_error', onConnectionError);
    socket.on('disconnect', onDisconnect);

    // Custom events
    socket.on('init', onInit);
    socket.on('error', onError);
    socket.on('signIn', onSignIn);

    socket.emit('init', session?.user?.token || '');

    setSocket(socket);

    return () => {
      socket.off('connect_error', onConnectionError);
      socket.off('disconnect', onDisconnect);

      socket.off('init', onInit);
      socket.off('error', onError);
      socket.off('signIn', onSignIn);

      socket.close();
    };
  }, []);

  return socket;
};
