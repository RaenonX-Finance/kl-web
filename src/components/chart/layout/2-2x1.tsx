import React from 'react';

import useResizeObserver from 'use-resize-observer';

import {LayoutBase} from './base';
import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout2of2x1 = ({pxDataMap}: LayoutProps) => {
  const {ref, width, height} = useResizeObserver<HTMLDivElement>();

  const dataA = pxDataMap['A'];
  const dataB = pxDataMap['B'];

  return (
    <LayoutBase refCallback={ref}>
      {!!width && !!height && (
        <>
          <PxDataLayoutPane pxData={dataA} x={0} y={0} width={width / 2} height={height}/>
          <PxDataLayoutPane pxData={dataB} x={width / 2} y={0} width={width / 2} height={height}/>
        </>
      )}
    </LayoutBase>
  );
};
