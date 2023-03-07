import React from 'react';

import {AccountSocketContext} from './const';
import {useAccountSocket} from './main';
import {MainLoading} from '../../../components/common/loading/main';


type Props = {
  children: React.ReactNode,
};

export const AccountSocketProvider = ({children}: Props) => {
  const socket = useAccountSocket();

  return (
    <AccountSocketContext.Provider value={socket}>
      {socket ? children : <MainLoading/>}
    </AccountSocketContext.Provider>
  );
};
