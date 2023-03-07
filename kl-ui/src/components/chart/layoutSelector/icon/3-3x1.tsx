import React from 'react';

import {LayoutIconBase} from './base';
import {IconProps} from './type';


export const LayoutIcon3of3x1 = ({onClick}: IconProps) => {
  return (
    <LayoutIconBase
      layoutType="3-3x1"
      lines={[
        {x1: 1/3, y1: 0, x2: 1/3, y2: 1},
        {x1: 2/3, y1: 0, x2: 2/3, y2: 1},
      ]}
      onClick={onClick}
    />
  );
};
