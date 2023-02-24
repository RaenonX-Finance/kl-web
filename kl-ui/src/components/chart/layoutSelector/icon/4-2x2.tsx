import React from 'react';

import {LayoutIconBase} from './base';
import {IconProps} from './type';


export const LayoutIcon4of2x2 = ({onClick}: IconProps) => {
  return (
    <LayoutIconBase
      layoutType="4-2x2"
      lines={[
        {x1: 0.5, y1: 0, x2: 0.5, y2: 1},
        {x1: 0, y1: 0.5, x2: 1, y2: 0.5},
      ]}
      onClick={onClick}
    />
  );
};
