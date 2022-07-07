import React, {FormEvent} from 'react';

import {AxiosError} from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import {FloatingInput} from '../../../../components/common/form/floating/input';
import {getNextAuthCallbackUrl, requestOAuth2Token} from '../../../../utils/auth';
import {AuthLoginError} from '../error';
import {CustomLoginFormData, errorDetailTranslation, isTranslatedErrorDetail} from './type';


export const AuthCustomLoginForm = () => {
  const [formData, setFormData] = React.useState<CustomLoginFormData>({
    username: '',
    password: '',
    disabled: false,
    loginError: '',
  });
  const {username, password, disabled, loginError} = formData;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({
      ...formData,
      disabled: true,
      loginError: '',
    });

    try {
      const {data} = await requestOAuth2Token(username, password);

      window.location.assign(getNextAuthCallbackUrl(data.access_token));
    } catch (error) {
      const isAxiosError = error instanceof AxiosError;
      const response = isAxiosError ? error.response : undefined;
      const detail = response?.data?.detail;
      // Status could be `0` for network error
      const loginError = response && !!response.status ?
        (
          isTranslatedErrorDetail(detail) ?
            errorDetailTranslation[response.data.detail] :
            `${response.status} ${response.statusText} - ${JSON.stringify(response.data)}`
        ) :
        (
          isAxiosError ?
            `${error.code} - ${error.message}` :
            '開啟開發者模式後，截圖錯誤資訊，然後聯繫客服。'
        );

      console.error(error);
      setFormData({
        ...formData,
        disabled: false,
        password: '',
        loginError,
      });
    }
  };

  return (
    <>
      <AuthLoginError errorMessage={loginError}/>
      <Form onSubmit={onSubmit} className="mb-3">
        <FloatingInput
          type="text"
          label="帳號 ID"
          value={username}
          autoComplete="username"
          onChange={({target}) => setFormData({...formData, username: target.value})}
          className="mb-3"
          required
        />
        <FloatingInput
          type="password"
          label="密碼"
          value={password}
          autoComplete="current-password"
          onChange={({target}) => setFormData({...formData, password: target.value})}
          className="mb-3"
          required
        />
        <Button className="w-100" type="submit" onClick={() => ''} disabled={disabled || !username || !password}>
          {disabled && <><Spinner size="sm" animation="border"/>&nbsp;</>}登入
        </Button>
      </Form>
    </>
  );
};
