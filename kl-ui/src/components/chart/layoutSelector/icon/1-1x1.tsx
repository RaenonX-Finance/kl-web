import React from 'react';

import {LayoutIconBase} from './base';
import {IconProps} from './type';


export const LayoutIcon1of1x1 = ({onClick}: IconProps) => {
  return (
    <LayoutIconBase
      layoutType="1-1x1"
      lines={[]}
      onClick={onClick}
      hideOnPortrait={false}
    />
  );
};
