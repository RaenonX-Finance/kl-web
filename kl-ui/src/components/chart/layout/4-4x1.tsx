import React from 'react';

import useResizeObserver from 'use-resize-observer';

import {LayoutBase} from './base';
import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout4of4x1 = ({}: LayoutProps) => {
  const {ref, width, height} = useResizeObserver<HTMLDivElement>();

  return (
    <LayoutBase refCallback={ref}>
      {!!width && !!height && (
        <>
          <PxDataLayoutPane slot="A" x={0} y={0} width={width / 4} height={height}/>
          <PxDataLayoutPane slot="B" x={width * (1 / 4)} y={0} width={width / 4} height={height}/>
          <PxDataLayoutPane slot="C" x={width * (2 / 4)} y={0} width={width / 4} height={height}/>
          <PxDataLayoutPane slot="D" x={width * (3 / 4)} y={0} width={width / 4} height={height}/>
        </>
      )}
    </LayoutBase>
  );
};
