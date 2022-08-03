import React from 'react';

import Badge from 'react-bootstrap/Badge';

import {Permission} from '../../../../types/auth/user';


export const permissionBadge: {[permission in Permission]: React.ReactNode} = {
  'chart:view': <Badge bg="primary">使用<br/>圖表</Badge>,
  'permission:add': <Badge bg="dark-info">新增<br/>權限</Badge>,
  'permission:remove': <Badge bg="dark-info">移除<br/>權限</Badge>,
  'account:new': <Badge bg="dark-warning">新增<br/>帳戶</Badge>,
  'account:expiry': <Badge bg="dark-warning">更改<br/>到期</Badge>,
  'account:block': <Badge bg="dark-warning">封停<br/>帳戶</Badge>,
  'account:view': <Badge bg="dark-warning">瀏覽<br/>帳戶</Badge>,
};

export const AdminBadge = () => <Badge bg="light" text="dark">網站<br/>管理</Badge>;
