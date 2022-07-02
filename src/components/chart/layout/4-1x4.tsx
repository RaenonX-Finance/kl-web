import React from 'react';

import useResizeObserver from 'use-resize-observer';

import {LayoutBase} from './base';
import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout4of1x4 = ({}: LayoutProps) => {
  const {ref, width, height} = useResizeObserver<HTMLDivElement>();

  return (
    <LayoutBase refCallback={ref}>
      {!!width && !!height && (
        <>
          <PxDataLayoutPane slot="A" x={0} y={0} width={width} height={height / 4}/>
          <PxDataLayoutPane slot="B" x={0} y={height * (1 / 4)} width={width} height={height / 4}/>
          <PxDataLayoutPane slot="C" x={0} y={height * (2 / 4)} width={width} height={height / 4}/>
          <PxDataLayoutPane slot="D" x={0} y={height * (3 / 4)} width={width} height={height / 4}/>
        </>
      )}
    </LayoutBase>
  );
};
