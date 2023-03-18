import React from 'react';

import useResizeObserver from 'use-resize-observer';

import {LayoutBase} from './base';
import {PxLayoutContainer} from './render/container';
import {LayoutProps} from './type';


export const Layout4ofB2 = ({}: LayoutProps) => {
  const {ref, width, height} = useResizeObserver<HTMLDivElement>();

  return (
    <LayoutBase refCallback={ref}>
      {!!width && !!height && (
        <>
          <PxLayoutContainer slot="A" x={0} y={0} width={width / 2} height={height / 3}/>
          <PxLayoutContainer slot="B" x={width / 2} y={0} width={width / 2} height={height / 3}/>
          <PxLayoutContainer slot="C" x={0} y={height * (1 / 3)} width={width} height={height / 3}/>
          <PxLayoutContainer slot="D" x={0} y={height * (2 / 3)} width={width} height={height / 3}/>
        </>
      )}
    </LayoutBase>
  );
};
