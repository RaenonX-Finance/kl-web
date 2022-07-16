import {signIn as nextAuthSignIn, signOut as nextAuthSignOut} from 'next-auth/react';
import {ClientSafeProvider} from 'next-auth/react/types';

import {errorDispatchers} from '../state/error/dispatchers';
import {ErrorDispatcherName} from '../state/error/types';
import {useDispatch} from '../state/store';
import {CUSTOM_PROVIDER_ID} from '../types/auth/const';


type UseNextAuthSignInOptions = {
  providerId?: ClientSafeProvider['id'],
  noSignOut?: boolean,
};

type UseNextAuthCallReturn = {
  signIn: (opts?: UseNextAuthSignInOptions) => void,
};

export const useNextAuthCall = (): UseNextAuthCallReturn => {
  const dispatch = useDispatch();

  const signIn = async (opts?: UseNextAuthSignInOptions) => {
    try {
      if (!opts?.noSignOut) {
        await nextAuthSignOut();
      }

      await nextAuthSignIn(opts?.providerId || CUSTOM_PROVIDER_ID);
    } catch (err) {
      console.error(err);
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: JSON.stringify(err)}));
    }
  };

  return {signIn};
};
