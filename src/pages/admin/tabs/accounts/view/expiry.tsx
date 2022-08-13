import React from 'react';

import {format} from 'date-fns';
import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import {errorDispatchers} from '../../../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../../../state/error/types';
import {useDispatch} from '../../../../../state/store';
import {ISODateString, ISOTimestampWithTimezone} from '../../../../../types/time';
import {apiUpdateExpiry} from '../../../../../utils/api/admin';
import {getErrorMessage} from '../../../../../utils/error';
import {isAllowed} from '../../../../../utils/permission';
import {AccountCellProps} from './type';


type Props = AccountCellProps;

export const AccountExpiry = ({account}: Props) => {
  const {admin, expiry, id} = account;
  const [expiryState, setExpiryState] = React.useState(expiry);
  const [updating, setUpdating] = React.useState(false);
  const {data} = useSession();
  const dispatch = useDispatch();

  if (!data?.user) {
    return <></>;
  }
  if (admin) {
    return <>-</>;
  }

  const expiryString = expiryState ? format(new Date(expiryState), 'yyyy-MM-dd') : undefined;

  const onClickUpdate = async () => {
    setUpdating(true);
    try {
      await apiUpdateExpiry({token: data.user.token || '', id, expiry: expiryState});
    } catch (err) {
      const message = getErrorMessage({err});
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message}));
    }
    setUpdating(false);
  };

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
          // Use `key` to clear input
          // https://stackoverflow.com/a/69536313/11571888
          key={(!expiryState).toString()}
        />
        <Button variant="outline-light" disabled={updating} onClick={onClickUpdate}>
          <i className="bi bi-chevron-up"/>
        </Button>
      </InputGroup>
    );
  }

  return <>{expiryString}</>;
};
