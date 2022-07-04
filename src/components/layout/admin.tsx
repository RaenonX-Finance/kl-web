import React from 'react';

import {useSession} from 'next-auth/react';

import {AdminRequired} from '../auth/permission/adminRequired';
import {LoginRequired} from '../auth/permission/loginRequired';
import {Loading} from '../common/loading';


export const AdminLayout = ({children}: React.PropsWithChildren<{}>) => {
  const {data, status} = useSession();

  if (status === 'loading') {
    return <Loading/>;
  } else if (data === null) {
    return <LoginRequired/>;
  } else if (!data.user.isAdmin) {
    return <AdminRequired/>;
  }

  return <>{children}</>;
};
