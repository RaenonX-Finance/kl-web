import {AjaxFormData} from '../../../../components/form/type';


export type GenerateSignupKeyData = AjaxFormData & {
  accountExpiry: string | undefined, // In format of `YYYY-MM-DD` - can use `new Date()` to init
};

export type GenerateSignupKeyResult = ({
  signupKey: string,
  expiry: Date,
} | {
  signupKey: null,
  expiry: null,
});
