import React from 'react';

import useResizeObserver from 'use-resize-observer';

import {LayoutBase} from './base';
import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout4ofTF = ({}: LayoutProps) => {
  const {ref, width, height} = useResizeObserver<HTMLDivElement>();

  return (
    <LayoutBase refCallback={ref}>
      {!!width && !!height && (
        <>
          <PxDataLayoutPane slot="A" x={0} y={0} width={width} height={height / 2}/>
          <PxDataLayoutPane slot="B" x={0} y={height / 2} width={width / 3} height={height / 2}/>
          <PxDataLayoutPane slot="C" x={width * (1 / 3)} y={height / 2} width={width / 3} height={height / 2}/>
          <PxDataLayoutPane slot="D" x={width * (2 / 3)} y={height / 2} width={width / 3} height={height / 2}/>
        </>
      )}
    </LayoutBase>
  );
};
