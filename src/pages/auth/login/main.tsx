import React from 'react';

import {getProviders} from 'next-auth/react';

import {AuthPage} from '../common/page';
import {AuthCustomLoginForm} from './form/main';
import {AuthLoginProviders} from './providers';


export type AuthLoginPageProps = {
  providers: UnwrapPromise<ReturnType<typeof getProviders>>,
};

export const AuthLoginPage = ({providers}: AuthLoginPageProps) => {
  return (
    <AuthPage>
      <AuthCustomLoginForm/>
      <AuthLoginProviders providers={providers}/>
    </AuthPage>
  );
};
