import React from 'react';

import {managementPermissions} from 'kl-web-common/models/api/account/permission';

import {adminPathToTabKey, adminTabs, tabKeyToAdminPath} from './const';
import {PermissionLayout} from '../../components/layout/permission';
import {Panel} from '../../components/panel/main';


export const AdminPanel = React.memo(() => {
  return (
    <PermissionLayout allowedWithPermissions={managementPermissions}>
      <Panel
        keyToPathMap={tabKeyToAdminPath}
        pathToKeyMap={adminPathToTabKey}
        tabs={adminTabs}
      />
    </PermissionLayout>
  );
});

AdminPanel.displayName = 'AdminPanel';
