import React from 'react';

import {useRouter} from 'next/router';
import Button from 'react-bootstrap/Button';

import {FloatingInput} from '../../../../components/common/form/floating/input';
import {TextWithLoading} from '../../../../components/common/loading/text';
import {AjaxForm} from '../../../../components/form/main';
import {GeneralPath} from '../../../../const/path';
import {apiSignupUser} from '../../../../utils/api/auth';
import {getErrorFromResponse} from '../../common/utils';
import {UserSignupFormData} from './type';
import {isValidPassword, isValidUsername} from './utils';


export const AuthSignupForm = () => {
  const {query} = useRouter();
  const [data, setData] = React.useState<UserSignupFormData>({
    username: '',
    password: '',
    passwordConfirm: '',
    signupKey: query.signupKey as string || '',
    disabled: false,
    error: '',
  });
  const {signupKey, username, password, passwordConfirm, disabled} = data;
  const isUsernameValid = isValidUsername(username);
  const isPasswordValid = isValidPassword(password);
  const isPasswordMatch = !!password && !!passwordConfirm && password === passwordConfirm;
  const signupDisabled = disabled || !isUsernameValid || !isPasswordValid || !isPasswordMatch;

  const onSubmit = async () => {
    await apiSignupUser({username, password, signupKey});

    // Redirect the user to the chart page
    // > This redirects the user back to the login page
    // > because `next-auth` does not recognize that the user is signed in.
    // > `next-auth` currently doesn't have a way to programmatically sign in a user.
    window.location.assign(GeneralPath.CHART);
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
        minLength={6}
        onChange={({target}) => setData({...data, username: target.value})}
        className="mb-3"
        required
        isValid={isUsernameValid}
        isInvalid={!isUsernameValid}
        feedbackOnInvalid="帳號 ID 最低長度為 6 個字元。"
      />
      <FloatingInput
        type="password"
        label="密碼"
        autoComplete="new-password"
        value={password}
        minLength={8}
        onChange={({target}) => setData({...data, password: target.value})}
        className="mb-3"
        required
        isValid={isPasswordValid}
        isInvalid={!isPasswordValid}
        feedbackOnInvalid="密碼最低長度為 8 個字元。"
      />
      <FloatingInput
        type="password"
        label="密碼確認"
        autoComplete="new-password"
        value={passwordConfirm}
        minLength={8}
        onChange={({target}) => setData({...data, passwordConfirm: target.value})}
        className="mb-3"
        required
        isValid={isPasswordMatch}
        isInvalid={!isPasswordMatch}
        feedbackOnInvalid="密碼不相符。"
      />
      <Button className="w-100" variant="info" disabled={signupDisabled} type="submit">
        <TextWithLoading show={disabled} text="註冊"/>
      </Button>
    </AjaxForm>
  );
};
