import React from 'react';

import {StatusBlocked} from './blocked';
import {StatusExpired} from './expired';
import {StatusOffline} from './offline';
import {StatusOnline} from './online';
import {AccountCellProps} from '../type';
import {isExpired} from '../utils';


type Props = AccountCellProps;

export const StatusIcon = ({account}: Props) => {
  const {blocked, expiry, online} = account;

  if (blocked) {
    return <StatusBlocked/>;
  } else if (isExpired(expiry)) {
    return <StatusExpired/>;
  } else if (online) {
    return <StatusOnline/>;
  }

  return <StatusOffline/>;
};
