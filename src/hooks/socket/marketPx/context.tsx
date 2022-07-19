import React from 'react';

import {MainLoading} from '../../../components/common/loading/main';
import {MarketPxSocketContext} from './const';
import {useMarketPxSocket} from './main';


type Props = {
  children: React.ReactNode,
  security: string,
};

export const MarketPxDataSocketContext = ({children, security}: Props) => {
  const socket = useMarketPxSocket({security});

  return (
    <MarketPxSocketContext.Provider value={socket}>
      {socket ? children : <MainLoading/>}
    </MarketPxSocketContext.Provider>
  );
};
