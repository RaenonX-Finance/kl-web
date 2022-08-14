import React from 'react';

import {AccountCellUpdatableProps} from '../type';
import {AccountActionBlock} from './block';
import {AccountActionPermission} from './permission';


type Props = AccountCellUpdatableProps;

export const AccountActions = (props: Props) => {
  return (
    <>
      <AccountActionBlock {...props}/>
      <AccountActionPermission {...props}/>
    </>
  );
};
