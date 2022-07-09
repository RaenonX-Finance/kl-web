import React from 'react';

import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import {FloatingInput} from '../../../../components/common/form/floating/input';
import {AjaxForm} from '../../../../components/form/main';
import {AuthPath} from '../../../../const/path';
import {getNextAuthCallbackUrl, requestOAuth2Token} from '../../../../utils/auth';
import {CustomLoginFormData} from './type';


export const AuthCustomLoginForm = () => {
  const [data, setData] = React.useState<CustomLoginFormData>({
    username: '',
    password: '',
    disabled: false,
    error: '',
  });
  const {username, password, disabled} = data;

  const onSubmit = async () => {
    const {data} = await requestOAuth2Token(username, password);

    window.location.assign(getNextAuthCallbackUrl(data.access_token));
  };

  return (
    <AjaxForm data={data} setData={setData} onSubmit={onSubmit}>
      <FloatingInput
        type="text"
        label="帳號 ID"
        value={username}
        autoComplete="username"
        onChange={({target}) => setData({...data, username: target.value})}
        className="mb-3"
        required
      />
      <FloatingInput
        type="password"
        label="密碼"
        value={password}
        autoComplete="current-password"
        onChange={({target}) => setData({...data, password: target.value})}
        className="mb-3"
        required
      />
      <Row className="g-3">
        <Col>
          <Button className="w-100" variant="info" disabled={disabled} type="submit">
            {disabled && <><Spinner size="sm" animation="border"/>&nbsp;</>}登入
          </Button>
        </Col>
        <Col>
          <Link href={AuthPath.SIGNUP}>
            <Button className="w-100" variant="outline-info" disabled={disabled}>
              {disabled && <><Spinner size="sm" animation="border"/>&nbsp;</>}註冊
            </Button>
          </Link>
        </Col>
      </Row>
    </AjaxForm>
  );
};
