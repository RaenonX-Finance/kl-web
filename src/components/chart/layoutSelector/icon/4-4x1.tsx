import React from 'react';

import {LayoutIconBase} from './base';


export const LayoutIcon4of4x1 = () => {
  return <LayoutIconBase lines={[
    {x1: 1/4, y1: 0, x2: 1/4, y2: 1},
    {x1: 2/4, y1: 0, x2: 2/4, y2: 1},
    {x1: 3/4, y1: 0, x2: 3/4, y2: 1},
  ]}/>;
};
