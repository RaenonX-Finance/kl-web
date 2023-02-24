import React from 'react';

import {PxSocketContext} from './const';
import {usePxSocket} from './main';
import {MainLoading} from '../../../components/common/loading/main';
import {usePxDataSubscriptionInfoSelector} from '../../../state/pxData/selector';


type Props = {
  children: React.ReactNode,
};

export const PxSocketProvider = ({children}: Props) => {
  const subscriptionInfo = usePxDataSubscriptionInfoSelector();
  const socket = usePxSocket(subscriptionInfo);

  return (
    <PxSocketContext.Provider value={socket}>
      {socket ? children : <MainLoading/>}
    </PxSocketContext.Provider>
  );
};
