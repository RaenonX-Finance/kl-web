import React from 'react';

import {useSession} from 'next-auth/react';

import {useLayoutTypeConfigSelector} from '../../../state/config/selector';
import {getValidSlotNames} from '../../../state/config/utils';
import {pxDataDispatchers} from '../../../state/pxData/dispatchers';
import {usePxSlotMap} from '../../../state/pxData/selector';
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
  const layoutType = useLayoutTypeConfigSelector();
  const slotMap = usePxSlotMap();
  const dispatch = useDispatch();

  // Custom events
  const onPxInit = useSocketEventHandler({
    dispatch,
    action: pxDataDispatchers[PxDataDispatcherName.INIT],
  });

  // Hooks
  React.useEffect(() => {
    if (!socket || !layoutType || !slotMap) {
      return;
    }

    socket.on('pxInit', onPxInit);

    const message: PxInitMessage = {
      token: data?.user?.token,
      identifiers: (
        getValidSlotNames(layoutType)?.map((slotName) => slotMap[slotName]) ||
        Object.values(slotMap)
      ),
    };
    socket.emit('pxInit', message);

    return () => {
      socket.off('pxInit', onPxInit);
    };
  }, [socket, layoutType]);
};
