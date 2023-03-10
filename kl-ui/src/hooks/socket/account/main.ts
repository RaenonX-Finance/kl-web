import React from 'react';

import {useSession} from 'next-auth/react';

import {useAuthHandler} from './auth';
import {AccountSocket} from './type';
import {mergedDispatchers} from '../../../state/aggregated/dispatchers';
import {MergedDispatcherName} from '../../../state/aggregated/types';
import {errorDispatchers} from '../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../state/error/types';
import {useDispatch} from '../../../state/store';
import {InitAccountData} from '../../../types/init';
import {generateAccountSocketClient} from '../../../utils/socket';
import {useNextAuthCall} from '../../auth';
import {useCommonSocketEventHandlers} from '../common/event/main';


export const useAccountSocket = (): AccountSocket | undefined => {
  const [socket, setSocket] = React.useState<AccountSocket>();
  const {data: session} = useSession();
  const dispatch = useDispatch();
  const {signIn} = useNextAuthCall();
  useAuthHandler({socket});
  useCommonSocketEventHandlers({
    name: '帳號管理',
    socket,
  });

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

    // Custom events
    socket.on('init', onInit);
    socket.on('error', onError);

    socket.emit('init', session?.user?.token || '');

    setSocket(socket);

    return () => {
      socket.off('init', onInit);
      socket.off('error', onError);

      socket.close();
    };
  }, []);

  return socket;
};
