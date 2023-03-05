import {useNextAuthCall} from './auth';
import {errorDispatchers} from '../state/error/dispatchers';
import {ErrorDispatcherName} from '../state/error/types';
import {useDispatch} from '../state/store';
import {getErrorMessage} from '../utils/error';


type UseHandleAxiosErrorOpts = {
  signInOnError?: boolean,
};

type UseHandleAxiosErrorReturn = {
  onError: (err: any) => void,
};

export const useHandleAxiosError = (opts?: UseHandleAxiosErrorOpts): UseHandleAxiosErrorReturn => {
  const dispatch = useDispatch();
  const {signIn} = useNextAuthCall();

  return {
    onError: (err) => {
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: getErrorMessage({err})}));

      if (!!opts?.signInOnError) {
        signIn();
      }
    },
  };
};
