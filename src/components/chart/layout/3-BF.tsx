import React from 'react';

import useResizeObserver from 'use-resize-observer';

import {LayoutBase} from './base';
import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout3ofBF = ({pxDataMap}: LayoutProps) => {
  const {ref, width, height} = useResizeObserver<HTMLDivElement>();

  const dataA = pxDataMap['A'];
  const dataB = pxDataMap['B'];
  const dataC = pxDataMap['C'];

  return (
    <LayoutBase refCallback={ref}>
      {!!width && !!height && (
        <>
          <PxDataLayoutPane slot="A" pxData={dataA} x={0} y={0} width={width / 2} height={height / 2}/>
          <PxDataLayoutPane slot="B" pxData={dataB} x={width / 2} y={0} width={width / 2} height={height / 2}/>
          <PxDataLayoutPane slot="C" pxData={dataC} x={0} y={height / 2} width={width} height={height / 2}/>
        </>
      )}
    </LayoutBase>
  );
};
