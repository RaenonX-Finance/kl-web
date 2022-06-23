import React from 'react';

import {SlicerLineProps} from './type';


type Props = {
  lines: SlicerLineProps[],
  size?: number,
};

export const LayoutIconBase = ({lines, size = 50}: Props) => {
  return (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" version="1.1">
      <g stroke="white">
        {lines.map(({x1, y1, x2, y2}, idx) => (
          <line
            key={idx}
            x1={x1 * size} y1={y1 * size}
            x2={x2 * size} y2={y2 * size}
            strokeWidth="2"
          />
        ))}
        <rect
          x="0" y="0"
          rx={size * 0.2} ry={size * 0.2}
          width={size} height={size}
          style={{fill: 'transparent', strokeWidth: 2}}
        />
      </g>
    </svg>
  );
};
