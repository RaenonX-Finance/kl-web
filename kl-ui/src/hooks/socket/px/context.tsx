import React from 'react';

import {PxSocketContext} from './const';
import {usePxSocket} from './main';
import {MainLoading} from '../../../components/common/loading/main';


type Props = {
  children: React.ReactNode,
};

export const PxSocketProvider = ({children}: Props) => {
  const socket = usePxSocket();

  return (
    <PxSocketContext.Provider value={socket}>
      {socket ? children : <MainLoading/>}
    </PxSocketContext.Provider>
  );
};
