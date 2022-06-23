import React from 'react';

import {LayoutIconBase} from './base';


export const LayoutIcon3of3x1 = () => {
  return <LayoutIconBase lines={[
    {x1: 1/3, y1: 0, x2: 1/3, y2: 1},
    {x1: 2/3, y1: 0, x2: 2/3, y2: 1},
  ]}/>;
};
