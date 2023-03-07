import React from 'react';

import {useSession} from 'next-auth/react';
import {Socket} from 'socket.io-client';

import {useAuthHandler} from './auth';
import {AccountSocket} from './type';
import {mergedDispatchers} from '../../../state/aggregated/dispatchers';
import {MergedDispatcherName} from '../../../state/aggregated/types';
import {errorDispatchers} from '../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../state/error/types';
import {useDispatch} from '../../../state/store';
import {InitAccountData} from '../../../types/init';
import {getErrorMessage} from '../../../utils/error';
import {generateAccountSocketClient} from '../../../utils/socket';
import {useNextAuthCall} from '../../auth';


export const useAccountSocket = (): AccountSocket | undefined => {
  const [socket, setSocket] = React.useState<AccountSocket>();
  const {data: session} = useSession();
  const dispatch = useDispatch();
  const {signIn} = useNextAuthCall();
  useAuthHandler({socket});

  // System events
  const onConnectionError = (err: Error) => {
    console.error(err);
    dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
      message: `帳號管理 Socket 連線錯誤: ${getErrorMessage({err})}`,
    }));
  };
  const onDisconnect = (reason: Socket.DisconnectReason) => {
    if (reason === 'io server disconnect') {
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: '連線已中斷。請檢查帳戶是否多開。'}));
    } else {
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: reason}));
    }
  };

  // Custom events
  const onInit = (initData: InitAccountData) => {
    if (!session || !!session.error) {
      return;
    }

    dispatch(mergedDispatchers[MergedDispatcherName.INIT_ACCOUNT](initData));
  };
  const onError = (message: string) => {
    dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message}));

    // Trigger `next-auth.signIn()` to recheck user auth validity
    signIn();
  };

  // Hooks
  React.useEffect(() => {
    const socket = generateAccountSocketClient();

    // System events
    socket.on('connect_error', onConnectionError);
    socket.on('disconnect', onDisconnect);

    // Custom events
    socket.on('init', onInit);
    socket.on('error', onError);

    socket.emit('init', session?.user?.token || '');

    setSocket(socket);

    return () => {
      socket.off('connect_error', onConnectionError);
      socket.off('disconnect', onDisconnect);

      socket.off('init', onInit);
      socket.off('error', onError);

      socket.close();
    };
  }, []);

  return socket;
};
