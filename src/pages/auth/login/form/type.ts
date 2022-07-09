import {AjaxFormData} from '../../../../components/form/type';


export const errorDetailTranslation: {[detail in string]: string} = {
  'User not exists': '帳號不存在。',
  'Incorrect password': '密碼不正確。',
};

// Exact error message returned from the backend
export type LoginErrorDetail = keyof typeof errorDetailTranslation;

export const isTranslatedErrorDetail = (detail: string): detail is LoginErrorDetail => {
  return Object.keys(errorDetailTranslation).includes(detail);
};

export type CustomLoginFormData = AjaxFormData & {
  username: string,
  password: string,
};
