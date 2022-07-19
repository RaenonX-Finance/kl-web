import React from 'react';

import {pxDataLayout} from '../../components/chart/layout/const';
import {PermissionLayout} from '../../components/layout/permission';
import {GeneralSocketProvider} from '../../hooks/socket/general/context';
import {useLayoutTypeConfigSelector} from '../../state/config/selector';


export const PxDataMain = () => {
  const layoutType = useLayoutTypeConfigSelector();

  const LayoutComponent = layoutType && pxDataLayout[layoutType];

  return (
    <PermissionLayout allowedWithPermissions={['chart:view']}>
      <GeneralSocketProvider>
        {LayoutComponent && <LayoutComponent/>}
      </GeneralSocketProvider>
    </PermissionLayout>
  );
};
