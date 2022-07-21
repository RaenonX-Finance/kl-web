import React from 'react';

import {useSession} from 'next-auth/react';

import {pxDataDispatchers} from '../../../state/pxData/dispatchers';
import {usePxDataSlotMap} from '../../../state/pxData/selector';
import {PxDataDispatcherName} from '../../../state/pxData/types';
import {useDispatch} from '../../../state/store';
import {PxInitMessage} from '../general/type';
import {useSocketEventHandler} from '../utils';
import {PxDataSocket} from './type';


type UsePxInitHandlerOpts = {
  socket: PxDataSocket | undefined,
};

export const usePxInitHandler = ({socket}: UsePxInitHandlerOpts) => {
  const {data} = useSession();
  const slotMap = usePxDataSlotMap();
  const dispatch = useDispatch();

  // Custom events
  const onPxInit = useSocketEventHandler({
    dispatch,
    action: pxDataDispatchers[PxDataDispatcherName.INIT],
  });

  // Hooks
  React.useEffect(() => {
    if (!socket || !slotMap) {
      return;
    }

    socket.on('pxInit', onPxInit);

    const message: PxInitMessage = {
      token: data?.user?.token,
      identifiers: Object.values(slotMap),
    };
    socket.emit('pxInit', message);

    return () => {
      socket.off('pxInit', onPxInit);
    };
  }, [socket, slotMap]);
};
