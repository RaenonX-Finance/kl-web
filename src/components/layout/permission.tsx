import React from 'react';

import {useSession} from 'next-auth/react';

import {Permission} from '../../types/auth/user';
import {InsufficientPermission} from '../auth/permission/insufficientPermission';
import {LoginRequired} from '../auth/permission/loginRequired';
import {Loading} from '../common/loading';


type Props = {
  allowedWithPermissions: Permission[]
};

export const PermissionLayout = ({children, allowedWithPermissions}: React.PropsWithChildren<Props>) => {
  const {data, status} = useSession();

  if (status === 'loading') {
    return <Loading/>;
  } else if (data === null) {
    return <LoginRequired/>;
  } else if (
    !data.user.isAdmin &&
    !data.user.permissions.some((permission) => allowedWithPermissions.includes(permission))
  ) {
    return <InsufficientPermission allowedPermissions={allowedWithPermissions}/>;
  }

  return <>{children}</>;
};
