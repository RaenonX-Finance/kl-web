import React from 'react';

import useResizeObserver from 'use-resize-observer';

import {LayoutBase} from './base';
import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout3of3x1 = ({}: LayoutProps) => {
  const {ref, width, height} = useResizeObserver<HTMLDivElement>();

  return (
    <LayoutBase refCallback={ref}>
      {!!width && !!height && (
        <>
          <PxDataLayoutPane slot="A" x={0} y={0} width={width / 3} height={height}/>
          <PxDataLayoutPane slot="B" x={width * (1 / 3)} y={0} width={width / 3} height={height}/>
          <PxDataLayoutPane slot="C" x={width * (2 / 3)} y={0} width={width / 3} height={height}/>
        </>
      )}
    </LayoutBase>
  );
};
