import React from 'react';

import {User} from 'next-auth';
import Button from 'react-bootstrap/Button';
import {ButtonVariant} from 'react-bootstrap/types';

import {availablePermissions, Permission} from '../../../../../../../types/auth/user';
import {isAllowed} from '../../../../../../../utils/permission';
import {permissionBadge} from '../../badges';
import styles from '../main.module.scss';
import {PermissionChangeState, PermissionChangeType} from './type';


type Props = {
  user: User,
  requiredPermission: Permission,
  title: string,
  activeVariant: ButtonVariant,
  filterPredicate: (permission: Permission) => boolean,
  permissionToChange: PermissionChangeState,
  setPermissionToChange: React.Dispatch<React.SetStateAction<PermissionChangeState>>,
  changeType: PermissionChangeType,
};

export const PermissionUpdateSelection = ({
  user,
  requiredPermission,
  title,
  activeVariant,
  filterPredicate,
  permissionToChange,
  setPermissionToChange,
  changeType,
}: Props) => {
  if (!isAllowed({...user, allowedWithPermissions: [requiredPermission]})) {
    return <></>;
  }

  return (
    <>
      <h5 className="mb-2">{title}</h5>
      {availablePermissions
        .filter(filterPredicate)
        .map((permission) => (
          <Button
            key={permission}
            variant={permissionToChange[changeType][permission] ? activeVariant : 'outline-secondary'}
            className={styles['permission-button']}
            onClick={() => (
              setPermissionToChange({
                ...permissionToChange,
                [changeType]: {
                  ...permissionToChange[changeType],
                  [permission]: !permissionToChange[changeType][permission],
                },
              })
            )}
          >
            {permissionBadge[permission]}
          </Button>
        ))}
    </>
  );
};
