import React from 'react';

import {MarketPxDataSocket} from './type';


export const MarketPxSocketContext = React.createContext<MarketPxDataSocket | undefined>(undefined);
