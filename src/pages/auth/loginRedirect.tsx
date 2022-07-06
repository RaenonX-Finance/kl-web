import React from 'react';

import {signIn, useSession} from 'next-auth/react';
import {useRouter} from 'next/router';

import {Loading} from '../../components/common/loading';
import {GeneralPath} from '../../const/path';
import {CUSTOM_PROVIDER_ID} from '../../types/auth/const';


export const LoginRedirect = () => {
  const {status} = useSession();
  const {query} = useRouter();

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      signIn(CUSTOM_PROVIDER_ID).catch(console.error);
    } else if (status === 'authenticated') {
      const redirectUrl = query.callbackUrl as (string | undefined);

      window.location.assign(redirectUrl || GeneralPath.CHART);
    }
  }, [status]);

  return <Loading/>;
};
