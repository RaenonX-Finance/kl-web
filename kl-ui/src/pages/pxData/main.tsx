import React from 'react';

import {pxDataLayout} from '../../components/chart/layout/const';
import {PermissionLayout} from '../../components/layout/permission';
import {useAppInitHandler} from '../../hooks/initApp';
import {GeneralSocketProvider} from '../../hooks/socket/general/context';
import {PxSocketProvider} from '../../hooks/socket/px/context';
import {useLayoutTypeConfigSelector} from '../../state/config/selector';


export const PxDataMain = () => {
  const layoutType = useLayoutTypeConfigSelector();
  useAppInitHandler();

  const LayoutComponent = layoutType && pxDataLayout[layoutType];

  return (
    <PermissionLayout allowedWithPermissions={['chart:view']}>
      <GeneralSocketProvider>
        <PxSocketProvider>
          {LayoutComponent && <LayoutComponent/>}
        </PxSocketProvider>
      </GeneralSocketProvider>
    </PermissionLayout>
  );
};
