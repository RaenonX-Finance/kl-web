import React from 'react';

import {signIn, useSession} from 'next-auth/react';
import {useRouter} from 'next/router';

import {Loading} from '../../components/common/loading';
import {GeneralPath} from '../../const/path';
import {errorDispatchers} from '../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../state/error/types';
import {useDispatch} from '../../state/store';
import {CUSTOM_PROVIDER_ID} from '../../types/auth/const';


export const LoginRedirect = () => {
  const {status} = useSession();
  const {query} = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      signIn(CUSTOM_PROVIDER_ID).catch((error) => {
        console.error(error);
        dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: JSON.stringify(error)}));
      });
    } else if (status === 'authenticated') {
      const redirectUrl = query.callbackUrl as (string | undefined);

      window.location.assign(redirectUrl || GeneralPath.CHART);
    }
  }, [status]);

  return <Loading/>;
};
