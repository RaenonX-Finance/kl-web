import React from 'react';

import {pxDataLayout} from '../../components/chart/layout/const';
import {ErrorPopup} from '../../components/error/popup';
import {PxDataSocketContext} from '../../hooks/socket/px/context';
import {useConfigSelector} from '../../state/config/selector';
import {usePxDataSelector} from '../../state/pxData/selector';


export const PxDataMain = () => {
  const {data} = usePxDataSelector();
  const {layoutType} = useConfigSelector();

  return (
    <PxDataSocketContext>
      <ErrorPopup/>
      {pxDataLayout[layoutType](data)}
    </PxDataSocketContext>
  );
};
