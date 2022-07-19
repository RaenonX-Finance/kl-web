import React from 'react';

import {useSession} from 'next-auth/react';

import {MainLoading} from '../../../components/common/loading/main';
import {useSingleLayoutConfigSelector} from '../../../state/config/selector';
import {getConfig} from '../../../state/config/utils';
import {PxSlotName} from '../../../types/pxData';
import {PxSocketContext} from './const';
import {usePxSocket} from './main';
import {RequestPxMessage} from './type';


type Props = {
  children: React.ReactNode,
  security: string,
  slot: PxSlotName,
  identifier: string,
};

export const PxSocketProvider = ({children, security, slot, identifier}: Props) => {
  const socket = usePxSocket({security});
  const {data: session} = useSession();
  const layoutConfig = useSingleLayoutConfigSelector(slot);

  React.useEffect(() => {
    if (!socket || !layoutConfig) {
      return;
    }

    const intervalId = setInterval(() => {
      const requestMessage: RequestPxMessage = {
        token: session?.user?.token,
        identifier,
      };

      socket.emit('request', JSON.stringify(requestMessage));
    }, getConfig(layoutConfig, 'intervalHistoryPxSec') * 1000);

    return () => clearInterval(intervalId);
  }, [socket, layoutConfig]);

  return (
    <PxSocketContext.Provider value={socket}>
      {socket ? children : <MainLoading/>}
    </PxSocketContext.Provider>
  );
};
