import React from 'react';

import {LayoutIconBase} from './base';
import {IconProps} from './type';


export const LayoutIcon4ofL2 = ({onClick}: IconProps) => {
  return (
    <LayoutIconBase
      layoutType="4-L2"
      lines={[
        {x1: 1/3, y1: 0, x2: 1/3, y2: 1},
        {x1: 2/3, y1: 0, x2: 2/3, y2: 1},
        {x1: 0, y1: 0.5, x2: 1/3, y2: 0.5},
      ]}
      onClick={onClick}
    />
  );
};
