import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {FloatingInput} from '../../../../../../components/common/form/floating/input';
import {availablePermissions} from '../../../../../../types/auth/user';
import {permissionBadge} from '../badges';
import {AccountFilterConditions} from '../type';
import styles from './main.module.scss';


type Props = {
  conditions: AccountFilterConditions,
  setConditions: React.Dispatch<React.SetStateAction<AccountFilterConditions>>,
};

export const AccountFilter = ({conditions, setConditions}: Props) => {
  const {permissions} = conditions;

  return (
    <div className={styles['filter']}>
      <Row className="mb-3 g-3">
        <Col md>
          <FloatingInput
            label="使用者名稱"
          />
        </Col>
        <Col md>
          <FloatingInput
            type="date"
            label="到期日 (起)"
          />
        </Col>
        <Col md>
          <FloatingInput
            type="date"
            label="到期日 (訖)"
          />
        </Col>
      </Row>
      <Row className="text-start">
        <Col>
          權限
        </Col>
      </Row>
      <Row className="text-start">
        <Col>
          {availablePermissions
            .map((permission) => (
              <Button
                key={permission}
                variant={permissions[permission] ? 'success' : 'outline-secondary'}
                className={styles['permission-button']}
                onClick={() => setConditions({
                  ...conditions,
                  permissions: {
                    ...permissions,
                    [permission]: !permissions[permission],
                  }})}
              >
                {permissionBadge[permission]}
              </Button>
            ))}
        </Col>
      </Row>
      <hr className="my-3"/>
      <Row className="text-start mb-2">
        <Col>
          狀態
        </Col>
      </Row>
      <Row className="text-start">
        <Col>
          <ButtonGroup className="w-100">
            <Button variant="outline-info">(全部)</Button>
            <Button variant="outline-success">在線</Button>
            <Button variant="outline-light">離線</Button>
            <Button variant="outline-warning">逾期</Button>
            <Button variant="outline-danger">封鎖</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </div>
  );
};
