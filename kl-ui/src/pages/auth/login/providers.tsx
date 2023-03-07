import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {providerIcon} from './icons';
import {AuthLoginPageProps} from './main';
import styles from './main.module.scss';
import {useNextAuthCall} from '../../../hooks/auth';
import {CUSTOM_PROVIDER_ID} from '../../../types/auth/const';


export const AuthLoginProviders = ({providers}: AuthLoginPageProps) => {
  const {signIn} = useNextAuthCall();

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
                onClick={() => signIn({providerId: provider.id})}
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
