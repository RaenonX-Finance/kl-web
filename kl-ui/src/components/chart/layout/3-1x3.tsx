import React from 'react';

import useResizeObserver from 'use-resize-observer';

import {LayoutBase} from './base';
import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout3of1x3 = ({}: LayoutProps) => {
  const {ref, width, height} = useResizeObserver<HTMLDivElement>();

  return (
    <LayoutBase refCallback={ref}>
      {!!width && !!height && (
        <>
          <PxDataLayoutPane slot="A" x={0} y={0} width={width} height={height / 3}/>
          <PxDataLayoutPane slot="B" x={0} y={height * (1 / 3)} width={width} height={height / 3}/>
          <PxDataLayoutPane slot="C" x={0} y={height * (2 / 3)} width={width} height={height / 3}/>
        </>
      )}
    </LayoutBase>
  );
};
