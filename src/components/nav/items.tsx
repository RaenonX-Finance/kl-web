import React from 'react';

import {NavComponent} from './elements/component';
import {NavPath} from './elements/path';
import {NavText} from './elements/text';
import {NavItemCollection} from './type';


type Props = {
  navItems: NavItemCollection,
  pathname: string,
};

export const NavItems = ({navItems, pathname}: Props) => {
  return (
    <>
      {navItems.map((navItem, idx) => {
        const {type} = navItem;

        if (type === 'path') {
          return <NavPath key={idx} pathname={pathname} {...navItem}/>;
        }
        if (type === 'text') {
          return <NavText key={idx} pathname={pathname} {...navItem}/>;
        }
        if (type === 'component') {
          return <NavComponent key={idx} pathname={pathname} {...navItem}/>;
        }
      })}
    </>
  );
};
