import React from 'react';

import {useSession} from 'next-auth/react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {AccountExpiry} from './sections/expiry';
import {AccountPermissions} from './sections/permissions';
import {AccountId} from './sections/userId';
import {ProtectedLayout} from '../../../components/layout/protected';


export const AccountInfoPage = () => {
  const {data} = useSession();

  return (
    <ProtectedLayout>
      {
        data &&
        <Row className="p-3">
          <Col xs sm={{offset: 3, span: 6}}>
            <AccountId user={data.user}/>
            <hr/>
            <AccountPermissions user={data.user}/>
            <hr/>
            <AccountExpiry user={data.user}/>
          </Col>
        </Row>
      }
    </ProtectedLayout>
  );
};
