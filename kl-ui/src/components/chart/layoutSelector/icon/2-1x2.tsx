import React from 'react';

import {LayoutIconBase} from './base';
import {IconProps} from './type';


export const LayoutIcon2of1x2 = ({onClick}: IconProps) => {
  return (
    <LayoutIconBase
      layoutType="2-1x2"
      lines={[
        {x1: 0, y1: 0.5, x2: 1, y2: 0.5},
      ]}
      onClick={onClick}
      hideOnPortrait={false}
    />
  );
};
