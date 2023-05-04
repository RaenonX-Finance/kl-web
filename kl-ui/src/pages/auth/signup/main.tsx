import React from 'react';

import {AuthSignupForm} from './form/main';
import {AuthPage} from '../common/page';


export const AuthSignupPage = React.memo(() => {
  return (
    <AuthPage>
      <AuthSignupForm/>
    </AuthPage>
  );
});

AuthSignupPage.displayName = 'AuthSignupPage';
