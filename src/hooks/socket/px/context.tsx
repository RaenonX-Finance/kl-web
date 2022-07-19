import React from 'react';

import {MainLoading} from '../../../components/common/loading/main';
import {PxSocketContext} from './const';
import {usePxSocket} from './main';


type Props = {
  children: React.ReactNode,
};

export const PxDataSocketContext = ({children}: Props) => {
  const socket = usePxSocket();

  return (
    <PxSocketContext.Provider value={socket}>
      {socket ? children : <MainLoading/>}
    </PxSocketContext.Provider>
  );
};
