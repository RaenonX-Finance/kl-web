import React from 'react';

import {isPagePath} from '../../../const/path';
import {NavItemReactComponent} from '../type';


type Props = NavItemReactComponent;

export const NavComponent = ({renderComponent, pathname, pathShowBasis}: Props) => {
  if (pathname && isPagePath(pathname) && pathShowBasis && !pathShowBasis.includes(pathname)) {
    // Hide if page path doesn't match
    return <></>;
  }

  return (
    <>
      {renderComponent()}
    </>
  );
};
