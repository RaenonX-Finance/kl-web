import React from 'react';

import {AccountActionBlock} from './block';
import {AccountActionPermission} from './permission/main';
import {AccountCellUpdatableProps} from '../type';


type Props = AccountCellUpdatableProps;

export const AccountActions = React.memo((props: Props) => {
  return (
    <>
      <AccountActionBlock {...props}/>
      <AccountActionPermission {...props}/>
    </>
  );
});

AccountActions.displayName = 'AccountActions';
