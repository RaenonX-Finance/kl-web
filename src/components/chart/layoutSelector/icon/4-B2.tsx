import React from 'react';

import {LayoutIconBase} from './base';


export const LayoutIcon4ofB2 = () => {
  return <LayoutIconBase lines={[
    {x1: 1/2, y1: 0, x2: 1/2, y2: 1/3},
    {x1: 0, y1: 1/3, x2: 1, y2: 1/3},
    {x1: 0, y1: 2/3, x2: 1, y2: 2/3},
  ]}/>;
};
