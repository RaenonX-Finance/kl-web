import React from 'react';

import {LayoutIconBase} from './base';
import {IconProps} from './type';


export const LayoutIcon4of1x4 = ({onClick}: IconProps) => {
  return (
    <LayoutIconBase
      layoutType="4-1x4"
      lines={[
        {x1: 0, y1: 1/4, x2: 1, y2: 1/4},
        {x1: 0, y1: 2/4, x2: 1, y2: 2/4},
        {x1: 0, y1: 3/4, x2: 1, y2: 3/4},
      ]}
      onClick={onClick}
    />
  );
};
