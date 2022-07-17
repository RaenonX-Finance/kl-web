import React from 'react';

import {MainLoading} from '../../../components/common/loading/main';
import {SocketContext} from '../../../types/socket/socket';
import {usePxSocket} from './main';


type PxDataContextProps = {
  children: React.ReactNode,
};


export const PxDataSocketContext = ({children}: PxDataContextProps) => {
  const socket = usePxSocket();

  return (
    <SocketContext.Provider value={socket}>
      {socket ? children : <MainLoading/>}
    </SocketContext.Provider>
  );
};
