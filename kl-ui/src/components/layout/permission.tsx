import React from 'react';

import {Permission} from 'kl-web-common/models/api/account/permission';
import {useSession} from 'next-auth/react';

import {CommonProtectedLayout} from './common';
import {LoginRedirect} from '../../pages/auth/loginRedirect';
import {isAllowed} from '../../utils/permission';
import {InsufficientPermission} from '../auth/permission/insufficientPermission';
import {MainLoading} from '../common/loading/main';


type Props = {
  allowedWithPermissions: Permission[]
};

export const PermissionLayout = ({children, allowedWithPermissions}: React.PropsWithChildren<Props>) => {
  const {data, status} = useSession();

  if (status === 'loading') {
    return <MainLoading/>;
  } else if (data === null) {
    return <LoginRedirect/>;
  } else if (!isAllowed({...data.user, allowedWithPermissions})) {
    return <InsufficientPermission allowedPermissions={allowedWithPermissions}/>;
  }

  return (
    <CommonProtectedLayout>
      {children}
    </CommonProtectedLayout>
  );
};
