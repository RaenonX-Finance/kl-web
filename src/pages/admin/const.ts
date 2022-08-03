import {AdminPath} from '../../const/path';
import {AdminTabAccountView} from './tabs/accounts/main';
import {AdminTabGenerateSignupKey} from './tabs/signupKey/main';
import {AdminTab, AdminTabKey} from './type';


export const adminTabs: AdminTab[] = [
  {
    tabKey: 'signupKey',
    name: '產生註冊金鑰',
    link: AdminPath.GENERATE_SIGNUP_KEY,
    Component: AdminTabGenerateSignupKey,
  },
  {
    tabKey: 'accountView',
    name: '帳戶一覽',
    link: AdminPath.ACCOUNT_VIEW,
    Component: AdminTabAccountView,
  },
];

export const tabKeyToAdminPath: {[key in AdminTabKey]: AdminPath} = {
  signupKey: AdminPath.GENERATE_SIGNUP_KEY,
  accountView: AdminPath.ACCOUNT_VIEW,
};

export const adminPathToTabKey: {[key in AdminPath]: AdminTabKey} = {
  [AdminPath.GENERATE_SIGNUP_KEY]: 'signupKey',
  [AdminPath.ACCOUNT_VIEW]: 'accountView',
};
