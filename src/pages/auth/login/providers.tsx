import React from 'react';

import {signIn} from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {CUSTOM_PROVIDER_ID} from '../../../types/auth/const';
import {providerIcon} from './icons';
import {AuthLoginPageProps} from './main';
import styles from './main.module.scss';


export const AuthLoginProviders = ({providers}: AuthLoginPageProps) => {
  if (!providers) {
    return <></>;
  }

  return (
    <Row>
      <Col>
        <div className={styles['provider-frame']}>
          {Object
            .values(providers)
            .filter((provider) => provider.id !== CUSTOM_PROVIDER_ID)
            .map((provider) => (
              <Button
                key={provider.name} variant="outline-light" className={styles['provider-button']}
                onClick={() => signIn(provider.id)}
              >
                {providerIcon[provider.name] || provider.name}
              </Button>
            ))
          }
        </div>
      </Col>
    </Row>
  );
};
