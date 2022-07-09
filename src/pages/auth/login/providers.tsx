import React from 'react';

import {signIn} from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {errorDispatchers} from '../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../state/error/types';
import {useDispatch} from '../../../state/store';
import {CUSTOM_PROVIDER_ID} from '../../../types/auth/const';
import {providerIcon} from './icons';
import {AuthLoginPageProps} from './main';
import styles from './main.module.scss';


export const AuthLoginProviders = ({providers}: AuthLoginPageProps) => {
  const dispatch = useDispatch();

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
                onClick={() => signIn(provider.id).catch((error) => {
                  console.error(error);
                  dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: JSON.stringify(error)}));
                })}
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
