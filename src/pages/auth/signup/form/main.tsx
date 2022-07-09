import React from 'react';

import {signIn} from 'next-auth/react';
import {useRouter} from 'next/router';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import {FloatingInput} from '../../../../components/common/form/floating/input';
import {AjaxForm} from '../../../../components/form/main';
import {errorDispatchers} from '../../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../../state/error/types';
import {useDispatch} from '../../../../state/store';
import {CUSTOM_PROVIDER_ID} from '../../../../types/auth/const';
import {apiSignupUser} from '../../../../utils/api/auth';
import {getErrorFromResponse} from '../../common/utils';
import {UserSignupFormData} from './type';


export const AuthSignupForm = () => {
  const {query} = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = React.useState<UserSignupFormData>({
    username: '',
    password: '',
    signupKey: query.signupKey as string || '',
    disabled: false,
    error: '',
  });
  const {signupKey, username, password, disabled} = data;

  const onSubmit = async () => {
    await apiSignupUser({username, password, signupKey});

    signIn(CUSTOM_PROVIDER_ID).catch((error) => {
      console.error(error);
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: JSON.stringify(error)}));
    });
  };

  return (
    <AjaxForm data={data} setData={setData} onSubmit={onSubmit} getError={getErrorFromResponse}>
      <FloatingInput
        type="text"
        label="註冊金鑰"
        value={signupKey}
        onChange={({target}) => setData({...data, signupKey: target.value})}
        className="mb-3"
        required
      />
      <FloatingInput
        type="text"
        label="帳號 ID"
        autoComplete="username"
        value={username}
        onChange={({target}) => setData({...data, username: target.value})}
        className="mb-3"
        required
      />
      <FloatingInput
        type="password"
        label="密碼"
        autoComplete="new-password"
        value={password}
        onChange={({target}) => setData({...data, password: target.value})}
        className="mb-3"
        required
      />
      <Button className="w-100" variant="info" disabled={disabled} type="submit">
        {disabled && <><Spinner size="sm" animation="border"/>&nbsp;</>}註冊
      </Button>
    </AjaxForm>
  );
};
