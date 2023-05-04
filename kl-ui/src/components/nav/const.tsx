import React from 'react';

import {managementPermissions} from 'kl-web-common/models/api/account/permission';

import {NavItemCollection} from './type';
import {AdminPath, GeneralPath, SmcAnalysisPath} from '../../const/path';
import {UserControlNavButton} from '../auth/user/main';
import {PxChartSharedConfig} from '../chart/config/shared/main';


export const navItemsAtLeft: NavItemCollection = [
  {
    type: 'path',
    path: GeneralPath.CHART,
    text: '價格圖表',
  },
  {
    type: 'path',
    path: SmcAnalysisPath.OPTIONS_OI,
    text: '選擇權',
  },
  {
    type: 'path',
    path: SmcAnalysisPath.FINANCIAL_EVENTS,
    text: '財經事件',
  },
  {
    type: 'path',
    path: GeneralPath.ACCOUNT_INFO,
    text: '會員資訊',
  },
  {
    type: 'path',
    href: 'https://kl-law.mystrikingly.com/',
    text: '官網',
  },
  {
    type: 'path',
    path: AdminPath.ACCOUNT_VIEW,
    text: '管理會員',
    pathActiveBasis: Object.values(AdminPath),
    requiredPermissions: managementPermissions,
  },
];

export const navItemsAtRight: NavItemCollection = [
  {
    type: 'component',
    renderComponent: () => <PxChartSharedConfig/>,
  },
  {
    type: 'component',
    renderComponent: () => <UserControlNavButton/>,
  },
];
