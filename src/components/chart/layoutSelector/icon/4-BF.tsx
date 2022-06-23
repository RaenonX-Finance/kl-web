import React from 'react';

import {LayoutIconBase} from './base';


export const LayoutIcon4ofBF = () => {
  return <LayoutIconBase lines={[
    {x1: 0, y1: 0.5, x2: 1, y2: 0.5},
    {x1: 1/3, y1: 0, x2: 1/3, y2: 0.5},
    {x1: 2/3, y1: 0, x2: 2/3, y2: 0.5},
  ]}/>;
};
