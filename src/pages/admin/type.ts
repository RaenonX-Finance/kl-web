import React from 'react';

import {AdminPath} from '../../const/path';


export type AdminTabKey =
  'signupKey' |
  'accountView';

export type AdminTab = {
  tabKey: AdminTabKey,
  name: string,
  link: AdminPath,
  Component: React.FunctionComponent,
};
