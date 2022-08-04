import React from 'react';

import {useSession} from 'next-auth/react';

import {LoginRedirect} from '../../pages/auth/loginRedirect';
import {AdminRequired} from '../auth/permission/adminRequired';
import {MainLoading} from '../common/loading/main';
import {CommonProtectedLayout} from './common';


export const AdminLayout = ({children}: React.PropsWithChildren<{}>) => {
  const {data, status} = useSession();

  if (status === 'loading') {
    return <MainLoading/>;
  } else if (data === null) {
    return <LoginRedirect/>;
  } else if (!data.user.isAdmin) {
    return <AdminRequired/>;
  }

  return (
    <CommonProtectedLayout>
      {children}
    </CommonProtectedLayout>
  );
};
