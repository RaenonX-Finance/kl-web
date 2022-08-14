import React from 'react';

import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import {AccountCellProps} from '../../type';
import {generatePermissionMap} from '../../utils';
import {PermissionUpdateSelection} from './selection';
import {PermissionChangeState} from './type';


type Props = AccountCellProps & {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
};

export const PermissionUpdateModal = ({account, show, setShow}: Props) => {
  const {data} = useSession();
  const {permissions} = account;
  const [permissionToChange, setPermissionToChange] = React.useState<PermissionChangeState>({
    add: generatePermissionMap(false),
    remove: generatePermissionMap(false),
  });

  if (!data?.user) {
    return <></>;
  }

  const onHide = () => {
    setShow(false);
    setPermissionToChange({
      add: generatePermissionMap(false),
      remove: generatePermissionMap(false),
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>編輯權限</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PermissionUpdateSelection
          user={data.user}
          requiredPermission={'permission:add'}
          title="新增權限"
          activeVariant="success"
          filterPredicate={(permission) => !permissions.includes(permission)}
          changeType="add"
          permissionToChange={permissionToChange}
          setPermissionToChange={setPermissionToChange}
        />
        <div className="mb-3"/>
        <PermissionUpdateSelection
          user={data.user}
          requiredPermission={'permission:remove'}
          title="移除權限"
          activeVariant="danger"
          filterPredicate={(permission) => permissions.includes(permission)}
          changeType="remove"
          permissionToChange={permissionToChange}
          setPermissionToChange={setPermissionToChange}
        />
        <hr/>
        <Row className="text-end">
          <Col>
            <Button>
              套用變更
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
