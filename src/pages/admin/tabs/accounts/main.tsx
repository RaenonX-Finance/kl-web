import React from 'react';

import {Permission} from '../../../../types/auth/user';


type Account = {
  username: string,
  permissions: Permission[],
  expiry: Date | null,
  blocked: boolean,
};

const accounts: Account[] = [
  // Active - Normal
  {
    username: 'accountA',
    permissions: ['chart:view'],
    expiry: new Date(2022, 9, 1),
    blocked: false,
  },
  // Active - Management
  {
    username: 'accountM',
    permissions: ['chart:view', 'account:view'],
    expiry: new Date(2022, 9, 1),
    blocked: false,
  },
  // Active - Admin
  {
    username: 'accountAd',
    permissions: [],
    expiry: null,
    blocked: false,
  },
  // Expired
  {
    username: 'accountE',
    permissions: ['chart:view'],
    expiry: new Date(2022, 9, 1),
    blocked: false,
  },
  // Blocked
  {
    username: 'accountB',
    permissions: ['chart:view'],
    expiry: new Date(2022, 9, 1),
    blocked: false,
  },
];

export const AdminTabAccountView = () => {
  return <>A</>;
};
