import React from 'react';

import {SocketContext} from '../../../types/socket/socket';
import {usePxSocketInit} from './init';


type PxDataContextProps = {
  children: React.ReactNode,
};


export const PxDataSocketContext = ({children}: PxDataContextProps) => {
  const socket = usePxSocketInit();

  return (
    <SocketContext.Provider value={socket}>
      {
        socket ?
          children :
          <>Px data socket not connected.</>
      }
    </SocketContext.Provider>
  );
};
