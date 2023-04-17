import React from 'react';

import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';

import {apiUpdateBlocked} from '../../../../../../utils/api/account/admin';
import {isAllowed} from '../../../../../../utils/permission';
import {useUpdateAccountData} from '../../hook';
import {AccountCellUpdatableProps} from '../type';


type Props = AccountCellUpdatableProps;

export const AccountActionBlock = ({account, updateSingleAccount}: Props) => {
  const {blocked, admin, id} = account;
  const {data} = useSession();
  const {updating, sendApiUpdateRequest} = useUpdateAccountData<boolean>({
    apiRequest: (token, blocked) => apiUpdateBlocked({
      token,
      id,
      blocked,
    }),
    updateSingleAccount,
  });

  if (
    !data?.user ||
    !isAllowed({...data.user, allowedWithPermissions: ['account:block']}) ||
    admin
  ) {
    return <></>;
  } else if (blocked) {
    return (
      <Button
        variant="outline-success"
        disabled={updating}
        size="sm"
        onClick={() => sendApiUpdateRequest(false)}
      >
        解鎖
      </Button>
    );
  }

  return (
    <Button
      variant="outline-danger"
      disabled={updating}
      size="sm"
      onClick={() => sendApiUpdateRequest(true)}
    >
      禁用
    </Button>
  );
};
