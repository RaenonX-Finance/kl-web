import React from 'react';

import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';

import {isAllowed} from '../../../../../utils/permission';
import {AccountCellProps} from '../type';


type Props = AccountCellProps;

export const AccountActionBlock = ({account}: Props) => {
  const {data} = useSession();
  const {blocked, admin} = account;

  if (
    !data?.user ||
    !isAllowed({...data.user, allowedWithPermissions: ['account:block']}) ||
    admin
  ) {
    return <></>;
  } else if (blocked) {
    return (
      <Button variant="outline-success" size="sm">
        解鎖
      </Button>
    );
  }

  return (
    <Button variant="outline-danger" size="sm">
      禁用
    </Button>
  );
};
