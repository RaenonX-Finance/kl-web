import React from 'react';

import useResizeObserver from 'use-resize-observer';

import {LayoutBase} from './base';
import {PxLayoutContainer} from './render/container';
import {LayoutProps} from './type';


export const Layout3ofLF = ({}: LayoutProps) => {
  const {ref, width, height} = useResizeObserver<HTMLDivElement>();

  return (
    <LayoutBase refCallback={ref}>
      {!!width && !!height && (
        <>
          <PxLayoutContainer
            slot="A"
            x={0} y={0}
            width={width / 2} height={height}
          />
          <PxLayoutContainer
            slot="B"
            x={width / 2} y={0}
            width={width / 2} height={height / 2}
          />
          <PxLayoutContainer
            slot="C"
            x={width / 2} y={height / 2}
            width={width / 2} height={height / 2}
          />
        </>
      )}
    </LayoutBase>
  );
};
