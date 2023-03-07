import React from 'react';

import {User} from 'next-auth';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import {ButtonVariant} from 'react-bootstrap/types';

import {PermissionChangeState, PermissionChangeType} from './type';
import {availablePermissions, Permission} from '../../../../../../../types/auth/user';
import {isAllowed} from '../../../../../../../utils/permission';
import {permissionBadge} from '../../badges';
import styles from '../main.module.scss';


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

  const permissionsToShow = availablePermissions.filter(filterPredicate);

  return (
    <>
      <h5 className="mb-2">{title}</h5>
      {
        permissionsToShow.length ?
          permissionsToShow.map((permission) => (
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
          )) :
          <Alert>
            <p className="m-0">
              {`無可${title}。`}
            </p>
          </Alert>
      }
    </>
  );
};
