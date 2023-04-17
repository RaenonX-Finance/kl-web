import React from 'react';

import {availablePermissions} from 'kl-web-common/models/api/account/permission';
import {ISODateString} from 'kl-web-common/types/time';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import styles from './main.module.scss';
import {FloatingInput} from '../../../../../../components/common/form/floating/input';
import {permissionBadge} from '../badges';
import {AccountFilterConditions, AccountStatus} from '../type';


type Props = {
  conditions: AccountFilterConditions,
  setConditions: React.Dispatch<React.SetStateAction<AccountFilterConditions>>,
};

export const AccountFilter = ({conditions, setConditions}: Props) => {
  const {username, expiry, permissions, status} = conditions;

  const updateStatus = (status: AccountStatus) => () => {
    setConditions({
      ...conditions,
      status,
    });
  };

  return (
    <div className={styles['filter']}>
      <Row className="mb-3 g-3">
        <Col md>
          <FloatingInput
            label="使用者名稱"
            value={username}
            onChange={({target}) => setConditions({
              ...conditions,
              username: target.value,
            })}
          />
        </Col>
        <Col md>
          <FloatingInput
            type="date"
            label="到期日 (起)"
            value={expiry.start || undefined}
            onChange={({target}) => setConditions({
              ...conditions,
              expiry: {
                ...conditions.expiry,
                start: target.value as ISODateString,
              },
            })}
          />
        </Col>
        <Col md>
          <FloatingInput
            type="date"
            label="到期日 (訖)"
            value={expiry.end || undefined}
            onChange={({target}) => setConditions({
              ...conditions,
              expiry: {
                ...conditions.expiry,
                end: target.value as ISODateString,
              },
            })}
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
                  },
                })}
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
            <Button
              variant="outline-info"
              active={status === 'all'}
              onClick={updateStatus('all')}
            >
              (全部)
            </Button>
            <Button
              variant="outline-success"
              active={status === 'online'}
              onClick={updateStatus('online')}
            >
              在線
            </Button>
            <Button
              variant="outline-light"
              active={status === 'offline'}
              onClick={updateStatus('offline')}
            >
              離線
            </Button>
            <Button
              variant="outline-warning"
              active={status === 'expired'}
              onClick={updateStatus('expired')}
            >
              逾期
            </Button>
            <Button
              variant="outline-danger"
              active={status === 'blocked'}
              onClick={updateStatus('blocked')}
            >
              封鎖
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </div>
  );
};
