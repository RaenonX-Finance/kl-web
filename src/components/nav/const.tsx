import React from 'react';

import {GeneralPath} from '../../const/path';
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
];

export const navItemsAtRight: NavItemCollection = [
  {
    type: 'component',
    renderComponent: () => <ChartLayoutSelector/>,
  },
];
