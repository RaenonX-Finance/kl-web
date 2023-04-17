import React from 'react';

import Alert from 'react-bootstrap/Alert';

import {PxLayoutContentProps} from './content';


type Props = Pick<PxLayoutContentProps, 'identifier'>;

export const PxDataError = ({identifier}: Props) => {
  return (
    <Alert className="mx-3" variant="warning">
      <Alert.Heading>無可用報價資料</Alert.Heading>
      <hr/>
      <span>{identifier} 沒有可用的報價資料。請點選上方寫有 {identifier} 的按鈕以重新選擇商品、標的。</span>
    </Alert>
  );
};
