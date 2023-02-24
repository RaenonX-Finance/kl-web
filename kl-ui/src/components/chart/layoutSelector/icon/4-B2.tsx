import React from 'react';

import {LayoutIconBase} from './base';
import {IconProps} from './type';


export const LayoutIcon4ofB2 = ({onClick}: IconProps) => {
  return (
    <LayoutIconBase
      layoutType="4-B2"
      lines={[
        {x1: 1/2, y1: 0, x2: 1/2, y2: 1/3},
        {x1: 0, y1: 1/3, x2: 1, y2: 1/3},
        {x1: 0, y1: 2/3, x2: 1, y2: 2/3},
      ]}
      onClick={onClick}
    />
  );
};
