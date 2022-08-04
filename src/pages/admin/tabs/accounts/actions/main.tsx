import React from 'react';

import {AccountCellProps} from '../type';
import {AccountActionBlock} from './block';
import {AccountActionPermission} from './permission';


type Props = AccountCellProps;

export const AccountActions = (props: Props) => {
  return (
    <>
      <AccountActionBlock {...props}/>
      <AccountActionPermission {...props}/>
    </>
  );
};
