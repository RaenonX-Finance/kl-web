import React from 'react';

import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import {availablePermissions, PermissionMap} from '../../../../../types/auth/user';
import {isAllowed} from '../../../../../utils/permission';
import {permissionBadge} from '../const';
import {AccountCellProps} from '../type';
import styles from './main.module.scss';
import {generatePermissionMap} from './utils';


type Props = AccountCellProps;

export const AccountActionPermission = ({account}: Props) => {
  const {data} = useSession();
  const {permissions, admin} = account;
  const [show, setShow] = React.useState(false);
  const [permissionToAdd, setPermissionToAdd] = React.useState<PermissionMap>(generatePermissionMap(false));
  const [permissionToRemove, setPermissionToRemove] = React.useState<PermissionMap>(generatePermissionMap(false));

  if (
    !data?.user ||
    !isAllowed({...data.user, allowedWithPermissions: ['permission:add', 'permission:remove']}) ||
    admin
  ) {
    return <></>;
  }

  const onHide = () => {
    setShow(false);
    setPermissionToAdd(generatePermissionMap(false));
    setPermissionToRemove(generatePermissionMap(false));
  };

  return (
    <>
      <Modal show={show} size="lg" onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>編輯權限</Modal.Title>
        </Modal.Header>
        {
          isAllowed({...data.user, allowedWithPermissions: ['permission:add']}) &&
          <>
            <h5 className="mx-3 mt-3 mb-0">新增權限</h5>
            <Modal.Body>
              {availablePermissions
                .filter((permission) => !permissions.includes(permission))
                .map((permission) => (
                  <Button
                    key={permission}
                    variant={permissionToAdd[permission] ? 'success' : 'outline-secondary'}
                    className={styles['permission-button']}
                    onClick={() => (
                      setPermissionToAdd({...permissionToAdd, [permission]: !permissionToAdd[permission]})
                    )}
                  >
                    {permissionBadge[permission]}
                  </Button>
                )) }
            </Modal.Body>
          </>
        }
        {
          isAllowed({...data.user, allowedWithPermissions: ['permission:remove']}) &&
          <>
            <h5 className="mx-3 mt-3 mb-0">移除權限</h5>
            <Modal.Body>
              {availablePermissions
                .filter((permission) => permissions.includes(permission))
                .map((permission) => (
                  <Button
                    key={permission}
                    variant={permissionToRemove[permission] ? 'danger' : 'outline-secondary'}
                    className={styles['permission-button']}
                    onClick={() => (
                      setPermissionToRemove({...permissionToRemove, [permission]: !permissionToRemove[permission]})
                    )}
                  >
                    {permissionBadge[permission]}
                  </Button>
                ))}
            </Modal.Body>
          </>
        }
        <Row className="mx-2 mb-3 text-end">
          <Col>
            <Button >
              套用變更
            </Button>
          </Col>
        </Row>
      </Modal>
      <Button variant="outline-info" size="sm" onClick={() => setShow(true)}>
        權限管理
      </Button>
    </>
  );
};
