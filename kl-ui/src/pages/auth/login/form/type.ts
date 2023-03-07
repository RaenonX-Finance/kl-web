import {AjaxFormData} from '../../../../components/form/type';


export type CustomLoginFormData = AjaxFormData & {
  username: string,
  password: string,
};
