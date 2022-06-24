import React from 'react';

import {LayoutIconBase} from './base';
import {IconProps} from './type';


export const LayoutIcon4of4x1 = ({onClick}: IconProps) => {
  return (
    <LayoutIconBase
      layoutType="4-4x1"
      lines={[
        {x1: 1/4, y1: 0, x2: 1/4, y2: 1},
        {x1: 2/4, y1: 0, x2: 2/4, y2: 1},
        {x1: 3/4, y1: 0, x2: 3/4, y2: 1},
      ]}
      onClick={onClick}
    />
  );
};
