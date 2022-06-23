import React from 'react';

import {LayoutIconBase} from './base';


export const LayoutIcon4ofRF = () => {
  return <LayoutIconBase lines={[
    {x1: 0.5, y1: 0, x2: 0.5, y2: 1},
    {x1: 0, y1: 1/3, x2: 0.5, y2: 1/3},
    {x1: 0, y1: 2/3, x2: 0.5, y2: 2/3},
  ]}/>;
};
