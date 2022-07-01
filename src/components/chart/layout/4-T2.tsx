import React from 'react';

import useResizeObserver from 'use-resize-observer';

import {LayoutBase} from './base';
import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout4ofT2 = ({pxDataMap}: LayoutProps) => {
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
            width={width} height={height / 3}
          />
          <PxDataLayoutPane
            slot="B" pxData={dataB}
            x={0} y={height * (1 / 3)}
            width={width} height={height / 3}
          />
          <PxDataLayoutPane
            slot="C" pxData={dataC}
            x={0} y={height * (2 / 3)}
            width={width / 2} height={height / 3}
          />
          <PxDataLayoutPane
            slot="D" pxData={dataD}
            x={width / 2} y={height * (2 / 3)}
            width={width / 2} height={height / 3}
          />
        </>
      )}
    </LayoutBase>
  );
};
