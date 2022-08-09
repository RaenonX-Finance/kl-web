import {AjaxFormData} from '../../../../components/form/type';


export type UserSignupFormData = AjaxFormData & {
  username: string,
  password: string,
  passwordConfirm: string,
  signupKey: string,
};
