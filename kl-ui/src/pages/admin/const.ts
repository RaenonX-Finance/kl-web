import {AdminTabAccountView} from './tabs/accounts/main';
import {AdminTabMarketSession} from './tabs/marketSession/main';
import {AdminTabGenerateSignupKey} from './tabs/signupKey/main';
import {AdminTab, AdminTabKey} from './type';
import {AdminPath} from '../../const/path';


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
  {
    tabKey: 'marketSession',
    name: '特殊收市時間',
    link: AdminPath.MARKET_SESSION,
    Component: AdminTabMarketSession,
  },
];

export const tabKeyToAdminPath: {[key in AdminTabKey]: AdminPath} = {
  signupKey: AdminPath.GENERATE_SIGNUP_KEY,
  accountView: AdminPath.ACCOUNT_VIEW,
  marketSession: AdminPath.MARKET_SESSION,
};

export const adminPathToTabKey: {[key in AdminPath]: AdminTabKey} = {
  [AdminPath.GENERATE_SIGNUP_KEY]: 'signupKey',
  [AdminPath.ACCOUNT_VIEW]: 'accountView',
  [AdminPath.MARKET_SESSION]: 'marketSession',
};
