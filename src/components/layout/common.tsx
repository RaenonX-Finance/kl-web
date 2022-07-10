import React from 'react';

import {signIn, useSession} from 'next-auth/react';

import {errorDispatchers} from '../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../state/error/types';
import {useDispatch} from '../../state/store';
import {CUSTOM_PROVIDER_ID} from '../../types/auth/const';


export const CommonProtectedLayout = ({children}: React.PropsWithChildren) => {
  const {data} = useSession();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!!data?.error) {
      console.error(`next-auth auto refresh failed: ${data.error}`);
      signIn(CUSTOM_PROVIDER_ID).catch((error) => {
        console.error(error);
        dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: JSON.stringify(error)}));
      });
    }
  }, [data]);

  return <>{children}</>;
};
