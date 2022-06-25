import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout2of2x1 = ({pxDataMap}: LayoutProps) => {
  const dataA = pxDataMap['A'];
  const dataB = pxDataMap['B'];

  return (
    <Row className="h-100 g-2 pb-2">
      <Col xs={6}>
        <PxDataLayoutPane pxData={dataA}/>
      </Col>
      <Col xs={6}>
        <PxDataLayoutPane pxData={dataB}/>
      </Col>
    </Row>
  );
};
