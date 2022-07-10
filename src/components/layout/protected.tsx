import React from 'react';

import {useSession} from 'next-auth/react';

import {LoginRequired} from '../auth/permission/loginRequired';
import {MainLoading} from '../common/loading/main';
import {CommonProtectedLayout} from './common';


export const ProtectedLayout = ({children}: React.PropsWithChildren<{}>) => {
  const {data, status} = useSession();

  if (status === 'loading') {
    return <MainLoading/>;
  } else if (data === null) {
    return <LoginRequired/>;
  }

  return (
    <CommonProtectedLayout>
      {children}
    </CommonProtectedLayout>
  );
};
