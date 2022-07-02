import React from 'react';

import {pxDataLayout} from '../../components/chart/layout/const';
import {ErrorPopup} from '../../components/error/popup';
import {PxDataSocketContext} from '../../hooks/socket/px/context';
import {useConfigSelector} from '../../state/config/selector';


export const PxDataMain = () => {
  const {layoutType} = useConfigSelector();

  const LayoutComponent = pxDataLayout[layoutType];

  return (
    <PxDataSocketContext>
      <ErrorPopup/>
      <LayoutComponent/>
    </PxDataSocketContext>
  );
};
