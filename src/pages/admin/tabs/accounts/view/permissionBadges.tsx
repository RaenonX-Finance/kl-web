import React from 'react';

import {AdminBadge, NoPermissionBadge, permissionBadge} from './badges';
import {AccountCellProps} from './type';


type Props = AccountCellProps;

export const AccountPermissionBadges = ({account}: Props) => {
  const {admin, permissions} = account;

  if (admin) {
    return <AdminBadge/>;
  } else if (!permissions.length) {
    return <NoPermissionBadge/>;
  }

  return (
    <>
      {permissions.map((permission) => (
        <React.Fragment key={permission}>{permissionBadge[permission]}</React.Fragment>
      ))}
    </>
  );
};
