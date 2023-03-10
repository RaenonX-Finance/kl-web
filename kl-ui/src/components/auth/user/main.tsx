import React from 'react';

import {signOut, useSession} from 'next-auth/react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import styles from './main.module.scss';
import {errorDispatchers} from '../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../state/error/types';
import {useDispatch} from '../../../state/store';
import {TextWithLoading} from '../../common/loading/text';


export const UserControlNavButton = () => {
  const [disabled, setDisabled] = React.useState(false);
  const {status, data} = useSession();
  const dispatch = useDispatch();

  const onClick = () => {
    setDisabled(true);
    signOut().catch((error) => {
      console.error(error);
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: JSON.stringify(error)}));
    });
  };

  if (status === 'unauthenticated' || status === 'loading') {
    return <></>;
  }

  return (
    <DropdownButton
      variant={data?.user.isAdmin ? 'outline-warning' : 'outline-success'}
      title={`@${data?.user.username}`}
      menuVariant="dark"
      drop="down-centered"
      className={styles['user-button']}
    >
      <Dropdown.Item onClick={onClick}>
        <TextWithLoading show={disabled} text="登出"/>
      </Dropdown.Item>
    </DropdownButton>
  );
};
