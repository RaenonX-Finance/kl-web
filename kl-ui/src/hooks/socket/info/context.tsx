import React from 'react';

import {InfoSocketContext} from './const';
import {useInfoSocket} from './main';
import {MainLoading} from '../../../components/common/loading/main';


type Props = {
  children: React.ReactNode,
};

export const InfoSocketProvider = ({children}: Props) => {
  const socket = useInfoSocket();

  return (
    <InfoSocketContext.Provider value={socket}>
      {socket ? children : <MainLoading/>}
    </InfoSocketContext.Provider>
  );
};
