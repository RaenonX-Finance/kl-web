import React from 'react';

import {AxiosResponse} from 'axios';
import {useSession} from 'next-auth/react';

import {errorDispatchers} from '../../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../../state/error/types';
import {useDispatch} from '../../../../state/store';
import {AccountData} from '../../../../types/admin';
import {getErrorMessage} from '../../../../utils/error';
import {UpdateSingleAccount} from './view/type';


type UseUpdateAccountDataProps<P> = {
  apiRequest: (token: string, payload: P) => Promise<AxiosResponse<AccountData>>,
  updateSingleAccount: UpdateSingleAccount,
};

type UpdateAccountDataReturns<P> = {
  updating: boolean,
  sendApiUpdateRequest: (payload: P) => Promise<void>,
};

export const useUpdateAccountData = <P, >({
  apiRequest,
  updateSingleAccount,
}: UseUpdateAccountDataProps<P>): UpdateAccountDataReturns<P> => {
  const [updating, setUpdating] = React.useState(false);
  const {data} = useSession();
  const dispatch = useDispatch();

  const sendApiUpdateRequest = async (payload: P) => {
    setUpdating(true);
    try {
      const updatedAccountData = await apiRequest(data?.user?.token || '', payload);
      updateSingleAccount(updatedAccountData.data);
    } catch (err) {
      const message = getErrorMessage({err});
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message}));
    }
    setUpdating(false);
  };

  return {updating, sendApiUpdateRequest};
};
