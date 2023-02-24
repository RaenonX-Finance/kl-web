import React from 'react';

import {LayoutIconBase} from './base';
import {IconProps} from './type';


export const LayoutIcon3ofLF = ({onClick}: IconProps) => {
  return (
    <LayoutIconBase
      layoutType="3-LF"
      lines={[
        {x1: 0.5, y1: 0.5, x2: 1, y2: 0.5},
        {x1: 0.5, y1: 0, x2: 0.5, y2: 1},
      ]}
      onClick={onClick}
    />
  );
};
