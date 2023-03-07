import React from 'react';

import {LayoutIconBase} from './base';
import {IconProps} from './type';


export const LayoutIcon2of2x1 = ({onClick}: IconProps) => {
  return (
    <LayoutIconBase
      layoutType="2-2x1"
      lines={[
        {x1: 0.5, y1: 0, x2: 0.5, y2: 1},
      ]}
      onClick={onClick}
    />
  );
};
