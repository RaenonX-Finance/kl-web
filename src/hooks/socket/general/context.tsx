import React from 'react';

import {MainLoading} from '../../../components/common/loading/main';
import {GeneralSocketContext} from './const';
import {useGeneralSocket} from './main';


type Props = {
  children: React.ReactNode,
};

export const GeneralSocketProvider = ({children}: Props) => {
  const socket = useGeneralSocket();

  return (
    <GeneralSocketContext.Provider value={socket}>
      {socket ? children : <MainLoading/>}
    </GeneralSocketContext.Provider>
  );
};
