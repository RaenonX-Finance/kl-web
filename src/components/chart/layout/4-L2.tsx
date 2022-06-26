import React from 'react';

import useResizeObserver from 'use-resize-observer';

import {LayoutBase} from './base';
import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout4ofL2 = ({pxDataMap}: LayoutProps) => {
  const {ref, width, height} = useResizeObserver<HTMLDivElement>();

  const dataA = pxDataMap['A'];
  const dataB = pxDataMap['B'];
  const dataC = pxDataMap['C'];
  const dataD = pxDataMap['D'];

  return (
    <LayoutBase refCallback={ref}>
      {!!width && !!height && (
        <>
          <PxDataLayoutPane pxData={dataA} x={0} y={0} width={width / 3} height={height}/>
          <PxDataLayoutPane pxData={dataB} x={width * (1 / 3)} y={0} width={width / 3} height={height}/>
          <PxDataLayoutPane pxData={dataC} x={width * (2 / 3)} y={0} width={width / 3} height={height / 2}/>
          <PxDataLayoutPane pxData={dataD} x={width * (2 / 3)} y={height / 2} width={width / 3} height={height / 2}/>
        </>
      )}
    </LayoutBase>
  );
};
