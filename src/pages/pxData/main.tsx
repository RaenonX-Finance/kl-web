import React from 'react';

import {pxDataLayout} from '../../components/chart/layout/const';
import {PermissionLayout} from '../../components/layout/permission';
import {PxDataSocketContext} from '../../hooks/socket/px/context';
import {useLayoutTypeConfigSelector} from '../../state/config/selector';


export const PxDataMain = () => {
  const layoutType = useLayoutTypeConfigSelector();

  const LayoutComponent = layoutType && pxDataLayout[layoutType];

  return (
    <PermissionLayout allowedWithPermissions={['chart:view']}>
      <PxDataSocketContext>
        {!!LayoutComponent && <LayoutComponent/>}
      </PxDataSocketContext>
    </PermissionLayout>
  );
};
