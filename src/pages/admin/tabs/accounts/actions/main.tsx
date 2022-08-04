import React from 'react';

import {AccountActionBlock} from './block';
import {AccountActionPermission} from './permission';
import {AccountActionProps} from './type';


type Props = AccountActionProps;

export const AccountActions = (props: Props) => {
  return (
    <>
      <AccountActionBlock {...props}/>
      <AccountActionPermission {...props}/>
    </>
  );
};
