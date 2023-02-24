import React from 'react';

import {useSession} from 'next-auth/react';

import {CommonProtectedLayout} from './common';
import {LoginRedirect} from '../../pages/auth/loginRedirect';
import {MainLoading} from '../common/loading/main';


export const ProtectedLayout = ({children}: React.PropsWithChildren<{}>) => {
  const {data, status} = useSession();

  if (status === 'loading') {
    return <MainLoading/>;
  } else if (data === null) {
    return <LoginRedirect/>;
  }

  return (
    <CommonProtectedLayout>
      {children}
    </CommonProtectedLayout>
  );
};
