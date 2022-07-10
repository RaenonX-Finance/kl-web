import React from 'react';

import {AdminPath, GeneralPath} from '../../const/path';
import {LogoutNavButton} from '../auth/logout/main';
import {ChartLayoutSelector} from '../chart/layoutSelector/main';
import {NavItemCollection} from './type';


export const navItemsAtLeft: NavItemCollection = [
  {
    type: 'path',
    path: GeneralPath.CHART,
    text: '價格圖表',
  },
  {
    type: 'path',
    path: GeneralPath.ACCOUNT_INFO,
    text: '會員資訊',
    disabled: true,
  },
  {
    type: 'path',
    href: 'https://kl-law.mystrikingly.com/',
    text: '官網',
  },
  {
    type: 'path',
    path: AdminPath.GENERATE_SIGNUP_KEY,
    text: '管理會員',
    pathActiveBasis: Object.values(AdminPath),
    adminOnly: true,
  },
];

export const navItemsAtRight: NavItemCollection = [
  {
    type: 'component',
    renderComponent: () => <ChartLayoutSelector/>,
  },
  {
    type: 'component',
    renderComponent: () => <LogoutNavButton/>,
  },
];
