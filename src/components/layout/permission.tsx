import React from 'react';

import {useSession} from 'next-auth/react';

import {Permission} from '../../types/auth/user';
import {isAllowed} from '../../utils/permission';
import {InsufficientPermission} from '../auth/permission/insufficientPermission';
import {LoginRequired} from '../auth/permission/loginRequired';
import {MainLoading} from '../common/loading/main';
import {CommonProtectedLayout} from './common';


type Props = {
  allowedWithPermissions: Permission[]
};

export const PermissionLayout = ({children, allowedWithPermissions}: React.PropsWithChildren<Props>) => {
  const {data, status} = useSession();

  if (status === 'loading') {
    return <MainLoading/>;
  } else if (data === null) {
    return <LoginRequired/>;
  } else if (!isAllowed({...data.user, allowedWithPermissions})) {
    return <InsufficientPermission allowedPermissions={allowedWithPermissions}/>;
  }

  return (
    <CommonProtectedLayout>
      {children}
    </CommonProtectedLayout>
  );
};
