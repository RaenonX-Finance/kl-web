import React from 'react';

import {LayoutIconBase} from './base';


export const LayoutIcon4of2x2 = () => {
  return <LayoutIconBase lines={[
    {x1: 0.5, y1: 0, x2: 0.5, y2: 1},
    {x1: 0, y1: 0.5, x2: 1, y2: 0.5},
  ]}/>;
};
