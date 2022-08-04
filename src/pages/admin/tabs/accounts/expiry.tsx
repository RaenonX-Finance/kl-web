import React from 'react';

import {format} from 'date-fns';
import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import {ISODateString} from '../../../../types/time';
import {isAllowed} from '../../../../utils/permission';
import {AccountCellProps} from './type';


type Props = AccountCellProps;

export const AccountExpiry = ({account}: Props) => {
  const {admin, expiry} = account;
  const [expiryState, setExpiryState] = React.useState(expiry);
  const {data} = useSession();

  if (!data?.user) {
    return <></>;
  }
  if (admin) {
    return <>-</>;
  }

  const expiryString = expiryState ? format(new Date(expiryState), 'yyyy-MM-dd') : undefined;

  if (isAllowed({...data.user, allowedWithPermissions: ['account:expiry']})) {
    return (
      <InputGroup>
        <Button variant="outline-danger" onClick={() => setExpiryState(null)}>
          <i className="bi bi-x-lg"/>
        </Button>
        <Form.Control
          type="date"
          value={expiryString}
          onChange={({target}) => setExpiryState(`${target.value as ISODateString}T23:59:59.999+00:00`)}
          // Use `key` to clear input
          // https://stackoverflow.com/a/69536313/11571888
          key={(!expiryState).toString()}
        />
        <Button variant="outline-light">
          <i className="bi bi-chevron-up"/>
        </Button>
      </InputGroup>
    );
  }

  return <>{expiryString}</>;
};
