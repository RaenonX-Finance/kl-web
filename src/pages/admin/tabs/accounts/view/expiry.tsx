import React from 'react';

import {format} from 'date-fns';
import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import {ISODateString, ISOTimestampWithTimezone} from '../../../../../types/time';
import {apiUpdateExpiry} from '../../../../../utils/api/admin';
import {isAllowed} from '../../../../../utils/permission';
import {useUpdateAccountData} from '../hook';
import {AccountCellUpdatableProps} from './type';


type Props = AccountCellUpdatableProps & {
  setAutoUpdate: React.Dispatch<React.SetStateAction<boolean>>,
};

export const AccountExpiry = ({account, updateSingleAccount, setAutoUpdate}: Props) => {
  const {admin, expiry, id} = account;
  const [expiryState, setExpiryState] = React.useState(expiry);
  const {data} = useSession();
  const {updating, sendApiUpdateRequest} = useUpdateAccountData({
    apiRequest: (token) => apiUpdateExpiry({
      token,
      id,
      expiry: expiryState,
    }),
    updateSingleAccount,
  });

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
        <Button variant="outline-danger" disabled={updating} onClick={() => setExpiryState(null)}>
          <i className="bi bi-x-lg"/>
        </Button>
        <Form.Control
          type="date"
          value={expiryString}
          onChange={({target}) => {
            const expiryString: ISOTimestampWithTimezone = `${target.value as ISODateString}T23:59:59.999+00:00`;

            try {
              // Test format as `target.value` could be an invalid date string
              format(new Date(expiryString), 'yyyy-MM-dd');
            } catch (e) {
              return;
            }

            setExpiryState(expiryString);
          }}
          onFocus={() => setAutoUpdate(false)}
          onBlur={() => setAutoUpdate(true)}
          // Use `key` to clear input
          // https://stackoverflow.com/a/69536313/11571888
          key={(!expiryState).toString()}
        />
        <Button variant="outline-light" disabled={updating} onClick={sendApiUpdateRequest}>
          <i className="bi bi-chevron-up"/>
        </Button>
      </InputGroup>
    );
  }

  return <>{expiryString}</>;
};
