import React from 'react';

import {useSession} from 'next-auth/react';

import {LoginRequired} from '../auth/permission/loginRequired';
import {Loading} from '../common/loading';
import {CommonProtectedLayout} from './common';


export const ProtectedLayout = ({children}: React.PropsWithChildren<{}>) => {
  const {data, status} = useSession();

  if (status === 'loading') {
    return <Loading/>;
  } else if (data === null) {
    return <LoginRequired/>;
  }

  return (
    <CommonProtectedLayout>
      {children}
    </CommonProtectedLayout>
  );
};
