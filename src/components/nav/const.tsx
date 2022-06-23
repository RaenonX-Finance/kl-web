import React from 'react';

import {GeneralPath} from '../../const/path';
import {ChartLayoutSelector} from '../chart/layoutSelector/main';
import {NavItems} from './type';


export const navItems: NavItems = [
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
    type: 'component',
    renderComponent: () => <ChartLayoutSelector/>,
  },
];
