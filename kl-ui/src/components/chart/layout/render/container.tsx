import React from 'react';

import {PxLayoutContent} from './content';
import {PxSlotName} from '../../../../types/pxData';


export type PxLayoutContainerProps = {
  slot: PxSlotName,
  width: number,
  height: number,
  x: number,
  y: number,
};

export const PxLayoutContainer = (props: PxLayoutContainerProps) => {
  const {width, height, x, y} = props;
  const containerCss: React.CSSProperties = {
    position: 'absolute',
    // Set the container size for Px data chart
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
    // Mainly for centering the loading icon
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={containerCss}>
      <PxLayoutContent {...props}/>
    </div>
  );
};
