import React from 'react';

import {useSession} from 'next-auth/react';

import {useNextAuthCall} from './auth';
import {mergedDispatchers} from '../state/aggregated/dispatchers';
import {MergedDispatcherName} from '../state/aggregated/types';
import {errorDispatchers} from '../state/error/dispatchers';
import {ErrorDispatcherName} from '../state/error/types';
import {useDispatch} from '../state/store';
import {apiInitApp} from '../utils/api/initApp';
import {getErrorMessage} from '../utils/error';


export const useAppInitHandler = () => {
  const {data} = useSession();
  const {signIn} = useNextAuthCall();
  const dispatch = useDispatch();
  const token = data?.user?.token;

  // Hooks
  React.useEffect(() => {
    if (!token) {
      throw new Error('Token unavailable - unable to initialize app');
    }

    apiInitApp({token})
      .then(({data}) => dispatch(mergedDispatchers[MergedDispatcherName.INIT_APP](data)))
      .catch((err) => {
        dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: getErrorMessage({err})}));
        signIn();
      });
  }, []);
};
