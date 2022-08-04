import React from 'react';

import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';

import {isAllowed} from '../../../../utils/permission';
import {Account} from './main';


type Props = {
  account: Account,
};

export const AccountActions = ({account}: Props) => {
  const {data} = useSession();
  const {blocked} = account;

  if (
    !data?.user ||
    !isAllowed({...data.user, allowedWithPermissions: ['account:block']})
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
