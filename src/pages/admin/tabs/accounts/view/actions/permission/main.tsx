import React from 'react';

import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';

import {isAllowed} from '../../../../../../../utils/permission';
import {AccountCellProps} from '../../type';
import {PermissionUpdateModal} from './modal';


type Props = AccountCellProps;

export const AccountActionPermission = ({account}: Props) => {
  const {data} = useSession();
  const {admin} = account;
  const [show, setShow] = React.useState(false);

  if (
    // Executor not exist in `next-auth` - auth issue
    !data?.user ||
    // Executor doesn't have sufficient permission
    !isAllowed({...data.user, allowedWithPermissions: ['permission:add', 'permission:remove']}) ||
    // Account to update is an admin
    admin
  ) {
    return <></>;
  }

  return (
    <>
      <Button variant="outline-info" size="sm" onClick={() => setShow(true)}>
        權限管理
      </Button>
      <PermissionUpdateModal
        account={account}
        show={show}
        setShow={setShow}
      />
    </>
  );
};
