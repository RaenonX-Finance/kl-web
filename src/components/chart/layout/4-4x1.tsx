import React from 'react';

import useResizeObserver from 'use-resize-observer';

import {LayoutBase} from './base';
import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout4of4x1 = ({pxDataMap}: LayoutProps) => {
  const {ref, width, height} = useResizeObserver<HTMLDivElement>();

  const dataA = pxDataMap['A'];
  const dataB = pxDataMap['B'];
  const dataC = pxDataMap['C'];
  const dataD = pxDataMap['D'];

  return (
    <LayoutBase refCallback={ref}>
      {!!width && !!height && (
        <>
          <PxDataLayoutPane
            slot="A" pxData={dataA}
            x={0} y={0}
            width={width / 4} height={height}
          />
          <PxDataLayoutPane
            slot="B" pxData={dataB}
            x={width * (1 / 4)} y={0}
            width={width / 4} height={height}
          />
          <PxDataLayoutPane
            slot="C" pxData={dataC}
            x={width * (2 / 4)} y={0}
            width={width / 4} height={height}
          />
          <PxDataLayoutPane
            slot="D" pxData={dataD}
            x={width * (3 / 4)} y={0}
            width={width / 4} height={height}
          />
        </>
      )}
    </LayoutBase>
  );
};
