import React from 'react';

import {GeneralPath, PagePath} from '../../const/path';


export type NavItemCommon = {
  pathname?: string,
};

export type NavItemPath = NavItemCommon & {
  type: 'path',
  text: string,
  disabled?: boolean,
  adminOnly?: boolean,
} & ({
  path?: GeneralPath,
  pathActiveBasis?: PagePath[],
  href?: never,
} | {
  path?: never,
  pathActiveBasis?: never,
  href?: string,
});

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

export type NavItems = NavItemEntry[];
