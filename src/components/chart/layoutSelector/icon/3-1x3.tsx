import React from 'react';

import {LayoutIconBase} from './base';
import {IconProps} from './type';


export const LayoutIcon3of1x3 = ({onClick}: IconProps) => {
  return (
    <LayoutIconBase
      layoutType="3-1x3"
      lines={[
        {x1: 0, y1: 1/3, x2: 1, y2: 1/3},
        {x1: 0, y1: 2/3, x2: 1, y2: 2/3},
      ]}
      onClick={onClick}
    />
  );
};
