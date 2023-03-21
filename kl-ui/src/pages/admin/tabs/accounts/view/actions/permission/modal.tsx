import React from 'react';

import {availablePermissions} from 'kl-web-common/models/api/account/permission';
import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import {PermissionUpdateSelection} from './selection';
import {PermissionChangeState} from './type';
import {TextWithLoading} from '../../../../../../../components/common/loading/text';
import {apiUpdatePermissions} from '../../../../../../../utils/api/admin';
import {useUpdateAccountData} from '../../../hook';
import {AccountCellUpdatableProps} from '../../type';
import {generatePermissionMap} from '../../utils';


type Props = AccountCellUpdatableProps & {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
};

export const PermissionUpdateModal = ({account, show, setShow, updateSingleAccount}: Props) => {
  const {data} = useSession();
  const {id, permissions} = account;
  const [permissionToChange, setPermissionToChange] = React.useState<PermissionChangeState>({
    add: generatePermissionMap(false),
    remove: generatePermissionMap(false),
  });
  const {updating, sendApiUpdateRequest} = useUpdateAccountData({
    apiRequest: (token) => apiUpdatePermissions({
      token,
      id,
      add: availablePermissions.filter((permission) => permissionToChange.add[permission]),
      remove: availablePermissions.filter((permission) => permissionToChange.remove[permission]),
    }),
    updateSingleAccount,
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

  const onSendChange = async () => {
    await sendApiUpdateRequest(undefined);
    onHide();
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
            <Button onClick={onSendChange} disabled={updating}>
              <TextWithLoading show={updating}>
                套用變更
              </TextWithLoading>
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
