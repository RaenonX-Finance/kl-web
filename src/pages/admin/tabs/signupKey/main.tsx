import React from 'react';

import {add, format} from 'date-fns';
import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';

import {FloatingInput} from '../../../../components/common/form/floating/input';
import {FormLikeOutput} from '../../../../components/common/form/output/main';
import {AjaxForm} from '../../../../components/form/main';
import {PermissionLayout} from '../../../../components/layout/permission';
import {apiGenerateSignupKey} from '../../../../utils/api/auth';
import {GenerateSignupKeyData, GenerateSignupKeyResult} from './type';


export const AdminTabGenerateSignupKey = () => {
  const {data: session} = useSession();
  const [data, setData] = React.useState<GenerateSignupKeyData>({
    accountExpiry: format(add(new Date(), {months: 1}), 'yyyy-MM-dd'),
    disabled: false,
    error: '',
  });
  const [result, setResult] = React.useState<GenerateSignupKeyResult>({
    signupKey: null,
    expiry: null,
  });
  const {accountExpiry, disabled} = data;
  const {signupKey, expiry} = result;

  const onSubmit = async () => {
    if (!accountExpiry) {
      throw Error('日期錯誤，資料驗證失敗');
    } else if (!session) {
      throw Error('使用者驗證錯誤，請重新登入 (Session)。');
    } else if (!session.user.token) {
      throw Error('使用者驗證錯誤，請重新登入 (Token)。');
    }

    const {data: response} = await apiGenerateSignupKey({
      accountExpiry: new Date(accountExpiry),
      token: session.user.token,
    });

    setResult({
      signupKey: response.signup_key,
      expiry: new Date(response.expiry),
    });
    setData({
      ...data,
      disabled: false,
    });
  };

  return (
    <PermissionLayout allowedWithPermissions={['account:new']}>
      <AjaxForm data={data} setData={setData} onSubmit={onSubmit}>
        <FloatingInput
          type="date"
          label="帳號過期日"
          value={accountExpiry}
          className="mb-3"
          onChange={({target}) => setData({
            ...data,
            // `target.value` is an empty string if the date value is invalid
            accountExpiry: target.value || undefined,
          })}
          required
        />
        <Button type="submit" className="w-100" variant="outline-warning" disabled={!accountExpiry || disabled}>
          產生註冊金鑰
        </Button>
      </AjaxForm>
      <hr/>
      <FormLikeOutput
        label="註冊金鑰"
        value={signupKey || undefined}
        className="mb-3"
      />
      <FormLikeOutput
        label="金鑰過期時間"
        value={expiry ? format(expiry, 'yyyy-MM-dd HH:mm:ss (O)') : undefined}
      />
    </PermissionLayout>
  );
};
