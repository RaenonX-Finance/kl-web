import React from 'react';

import {PagePath, PagePathAdminOnly, PagePathNormal} from '../../const/path';


export type NavItemCommon = {
  pathname?: string,
};

export type NavItemPathInternal = ({
  path?: PagePathNormal,
  pathActiveBasis?: PagePath[],
  href?: never,
  adminOnly?: never,
} | {
  path?: PagePathAdminOnly,
  pathActiveBasis?: PagePath[],
  href?: never,
  adminOnly: true,
});

export type NavItemPathExternal = {
  path?: never,
  pathActiveBasis?: never,
  href?: string,
  adminOnly?: boolean,
};

export type NavItemPath = NavItemCommon & {
  type: 'path',
  text: string,
  disabled?: boolean,
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
};

export type NavItemEntry =
  NavItemPath |
  NavItemText |
  NavItemReactComponent;

export type NavItemCollection = NavItemEntry[];
