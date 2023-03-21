import React from 'react';

import {Permission} from 'kl-web-common/models/api/account/permission';

import {PagePath, PagePathAdminOnly, PagePathNormal} from '../../const/path';


export type NavItemCommon = {
  pathname?: string,
};

export type NavItemPathInternal = ({
  path?: PagePathNormal,
  pathActiveBasis?: PagePath[],
  href?: never,
  requiredPermissions?: never,
} | {
  path?: PagePathAdminOnly,
  pathActiveBasis?: PagePath[],
  href?: never,
  requiredPermissions: Permission[],
});

export type NavItemPathExternal = {
  path?: never,
  pathActiveBasis?: never,
  href?: string,
  requiredPermissions?: Permission[],
};

export type NavItemPath = NavItemCommon & {
  type: 'path',
  text: string,
  disabled?: boolean,
  pathShowBasis?: PagePath[],
} & (
  NavItemPathInternal |
  NavItemPathExternal
);

export type NavItemText = NavItemCommon & {
  type: 'text',
  text: string,
};

export type NavItemReactComponent = NavItemCommon & {
  type: 'component',
  renderComponent: () => React.ReactNode,
  pathShowBasis?: PagePath[],
};

export type NavItemEntry =
  NavItemPath |
  NavItemText |
  NavItemReactComponent;

export type NavItemCollection = NavItemEntry[];
