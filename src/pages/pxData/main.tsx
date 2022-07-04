import React from 'react';

import {pxDataLayout} from '../../components/chart/layout/const';
import {ErrorPopup} from '../../components/error/popup';
import {PermissionLayout} from '../../components/layout/permission';
import {PxDataSocketContext} from '../../hooks/socket/px/context';
import {useLayoutTypeConfigSelector} from '../../state/config/selector';


export const PxDataMain = () => {
  const layoutType = useLayoutTypeConfigSelector();

  const LayoutComponent = pxDataLayout[layoutType];

  return (
    <PermissionLayout allowedWithPermissions={['chart:view']}>
      <PxDataSocketContext>
        <ErrorPopup/>
        <LayoutComponent/>
      </PxDataSocketContext>
    </PermissionLayout>
  );
};
