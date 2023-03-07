import React from 'react';

import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';

import {PermissionUpdateModal} from './modal';
import {isAllowed} from '../../../../../../../utils/permission';
import {AccountCellUpdatableProps} from '../../type';


type Props = AccountCellUpdatableProps;

export const AccountActionPermission = (props: Props) => {
  const {account} = props;
  const {admin} = account;
  const {data} = useSession();
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
        {...props}
        show={show}
        setShow={setShow}
      />
    </>
  );
};
