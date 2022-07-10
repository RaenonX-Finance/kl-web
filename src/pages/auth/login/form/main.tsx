import React from 'react';

import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {FloatingInput} from '../../../../components/common/form/floating/input';
import {TextWithLoading} from '../../../../components/common/loading/text';
import {AjaxForm} from '../../../../components/form/main';
import {AuthPath} from '../../../../const/path';
import {apiGetNextAuthCallbackUrl, apiRequestOAuth2Token} from '../../../../utils/api/auth';
import {getErrorFromResponse} from '../../common/utils';
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
    const {data} = await apiRequestOAuth2Token({username, password});

    window.location.assign(apiGetNextAuthCallbackUrl(data.access_token));
  };

  return (
    <AjaxForm data={data} setData={setData} onSubmit={onSubmit} getError={getErrorFromResponse}>
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
            <TextWithLoading show={disabled} text="登入"/>
          </Button>
        </Col>
        <Col>
          <Link href={AuthPath.SIGNUP}>
            <Button className="w-100" variant="outline-info" disabled={disabled}>
              <TextWithLoading show={disabled} text="註冊"/>
            </Button>
          </Link>
        </Col>
      </Row>
    </AjaxForm>
  );
};
