import React from 'react';

import useResizeObserver from 'use-resize-observer';

import {LayoutBase} from './base';
import {PxLayoutContainer} from './render/container';
import {LayoutProps} from './type';


export const Layout4ofR2 = ({}: LayoutProps) => {
  const {ref, width, height} = useResizeObserver<HTMLDivElement>();

  return (
    <LayoutBase refCallback={ref}>
      {!!width && !!height && (
        <>
          <PxLayoutContainer slot="A" x={0} y={0} width={width / 3} height={height / 2}/>
          <PxLayoutContainer slot="B" x={0} y={height / 2} width={width / 3} height={height / 2}/>
          <PxLayoutContainer slot="C" x={width * (1 / 3)} y={0} width={width / 3} height={height}/>
          <PxLayoutContainer slot="D" x={width * (2 / 3)} y={0} width={width / 3} height={height}/>
        </>
      )}
    </LayoutBase>
  );
};
