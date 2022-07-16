import React from 'react';

import {TextWithLoading} from '../../../components/common/loading/text';
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
          <TextWithLoading show text="行情資料 Socket 未連線。"/>
      }
    </SocketContext.Provider>
  );
};
