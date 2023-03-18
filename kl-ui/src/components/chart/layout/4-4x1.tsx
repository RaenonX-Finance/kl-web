import React from 'react';

import useResizeObserver from 'use-resize-observer';

import {LayoutBase} from './base';
import {PxLayoutContainer} from './render/container';
import {LayoutProps} from './type';


export const Layout4of4x1 = ({}: LayoutProps) => {
  const {ref, width, height} = useResizeObserver<HTMLDivElement>();

  return (
    <LayoutBase refCallback={ref}>
      {!!width && !!height && (
        <>
          <PxLayoutContainer slot="A" x={0} y={0} width={width / 4} height={height}/>
          <PxLayoutContainer slot="B" x={width * (1 / 4)} y={0} width={width / 4} height={height}/>
          <PxLayoutContainer slot="C" x={width * (2 / 4)} y={0} width={width / 4} height={height}/>
          <PxLayoutContainer slot="D" x={width * (3 / 4)} y={0} width={width / 4} height={height}/>
        </>
      )}
    </LayoutBase>
  );
};
