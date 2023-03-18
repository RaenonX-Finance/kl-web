import React from 'react';

import useResizeObserver from 'use-resize-observer';

import {LayoutBase} from './base';
import {PxLayoutContainer} from './render/container';
import {LayoutProps} from './type';


export const Layout4of1x4 = ({}: LayoutProps) => {
  const {ref, width, height} = useResizeObserver<HTMLDivElement>();

  return (
    <LayoutBase refCallback={ref}>
      {!!width && !!height && (
        <>
          <PxLayoutContainer slot="A" x={0} y={0} width={width} height={height / 4}/>
          <PxLayoutContainer slot="B" x={0} y={height * (1 / 4)} width={width} height={height / 4}/>
          <PxLayoutContainer slot="C" x={0} y={height * (2 / 4)} width={width} height={height / 4}/>
          <PxLayoutContainer slot="D" x={0} y={height * (3 / 4)} width={width} height={height / 4}/>
        </>
      )}
    </LayoutBase>
  );
};
