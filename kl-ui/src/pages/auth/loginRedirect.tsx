import React from 'react';

import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';

import {MainLoading} from '../../components/common/loading/main';
import {GeneralPath} from '../../const/path';
import {useNextAuthCall} from '../../hooks/auth';
import {CUSTOM_PROVIDER_ID} from '../../types/auth/const';


export const LoginRedirect = () => {
  const {status} = useSession();
  const {query} = useRouter();
  const {signIn} = useNextAuthCall();

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      // Must set `noSignOut` to `true`, or infinite loop happens
      // (Use main sign-in page -> redirect -> sign-out -> sign-in / go to main sign-in page -> ...)
      signIn({providerId: CUSTOM_PROVIDER_ID, noSignOut: true});
    } else if (status === 'authenticated') {
      const redirectUrl = query.callbackUrl as (string | undefined);

      window.location.assign(redirectUrl || GeneralPath.CHART);
    }
  }, [status]);

  return <MainLoading/>;
};
