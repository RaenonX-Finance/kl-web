import React from 'react';

import {useSession} from 'next-auth/react';

import {useNextAuthCall} from '../../hooks/auth';


export const CommonProtectedLayout = ({children}: React.PropsWithChildren) => {
  const {data} = useSession();
  const {signIn} = useNextAuthCall();

  React.useEffect(() => {
    if (!!data?.error) {
      console.error(`next-auth auto refresh failed: ${data.error}`);
      signIn();
    }
  }, [data]);

  return <>{children}</>;
};
