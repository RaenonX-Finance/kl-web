import React, {FormEvent} from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {FloatingInput} from '../../../components/common/form/floating/input';
import {getNextAuthCallbackUrl, requestOAuth2Token} from '../../../utils/auth';


export const AuthCustomLoginForm = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {data} = await requestOAuth2Token(username, password);

    window.location.assign(getNextAuthCallbackUrl(data.access_token));
  };

  return (
    <Form onSubmit={onSubmit} className="mb-3">
      <FloatingInput
        type="text"
        label="帳號 ID"
        autoComplete="username"
        onChange={({target}) => setUsername(target.value)}
        className="mb-3"
      />
      <FloatingInput
        type="password"
        label="密碼"
        autoComplete="current-password"
        onChange={({target}) => setPassword(target.value)}
        className="mb-3"
      />
      <Button className="w-100" type="submit">
        登入
      </Button>
    </Form>
  );
};
