import React from 'react';

import {isModerator} from '../../../../utils/permission';
import {AccountInfoProps} from '../type';


export const AccountUserIcon = ({user}: AccountInfoProps) => {
  if (user.isAdmin) {
    return <i className="bi bi-person-fill-gear text-warning"/>;
  }

  if (isModerator(user.permissions)) {
    return <i className="bi bi-person-fill-up text-info"/>;
  }

  return <i className="bi bi-person-fill text-success"/>;
};
