import {AdminPath} from '../../const/path';
import {AdminTabGenerateSignupKey} from './tabs/signupKey/main';
import {AdminTab, AdminTabKey} from './type';


export const DEFAULT_ADMIN_TAB_KEY: AdminTabKey = 'signupKey';

export const adminTabs: AdminTab[] = [
  {
    tabKey: 'signupKey',
    name: '產生註冊金鑰',
    link: AdminPath.GENERATE_SIGNUP_KEY,
    Component: AdminTabGenerateSignupKey,
  },
];

export const tabKeyToAdminPath: {[key in AdminTabKey]: AdminPath} = {
  signupKey: AdminPath.GENERATE_SIGNUP_KEY,
};
