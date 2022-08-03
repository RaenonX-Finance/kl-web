import React from 'react';

import {StatusBlocked} from './blocked';
import {StatusExpired} from './expired';
import {StatusOffline} from './offline';
import {StatusOnline} from './online';


type Props = {
  blocked: boolean,
  expiry: Date | null,
  online: boolean,
};

export const StatusIcon = ({blocked, expiry, online}: Props) => {
  if (blocked) {
    return <StatusBlocked/>;
  } else if (expiry && new Date() > expiry) {
    return <StatusExpired/>;
  } else if (online) {
    return <StatusOnline/>;
  }

  return <StatusOffline/>;
};
