import React from 'react';

import {useSession} from 'next-auth/react';

import {useHandleAxiosError} from './axios';
import {mergedDispatchers} from '../state/aggregated/dispatchers';
import {MergedDispatcherName} from '../state/aggregated/types';
import {useDispatch} from '../state/store';
import {apiInitApp} from '../utils/api/initApp';


export const useAppInitHandler = () => {
  const {data} = useSession();
  const {onError} = useHandleAxiosError();
  const dispatch = useDispatch();
  const token = data?.user?.token;

  // Hooks
  React.useEffect(() => {
    if (!token) {
      console.warn('Token unavailable - app init request not sent');
      return;
    }

    apiInitApp({token})
      .then(({data}) => dispatch(mergedDispatchers[MergedDispatcherName.INIT_APP](data)))
      .catch(onError);
  }, [token]);
};
