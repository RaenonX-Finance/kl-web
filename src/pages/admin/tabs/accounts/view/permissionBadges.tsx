import React from 'react';

import {AdminBadge, permissionBadge} from './badges';
import {AccountCellProps} from './type';


type Props = AccountCellProps;

export const AccountPermissionBadges = ({account}: Props) => {
  const {admin, permissions} = account;

  if (admin) {
    return <AdminBadge/>;
  }

  return (
    <>
      {permissions.map((permission) => (
        <React.Fragment key={permission}>{permissionBadge[permission]}</React.Fragment>
      ))}
    </>
  );
};
