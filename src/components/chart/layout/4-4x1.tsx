import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout4of4x1 = ({pxDataMap}: LayoutProps) => {
  const dataA = pxDataMap['A'];
  const dataB = pxDataMap['B'];
  const dataC = pxDataMap['C'];
  const dataD = pxDataMap['D'];

  return (
    <Row className="h-100 g-2">
      <Col xs={3}>
        <PxDataLayoutPane pxData={dataA}/>
      </Col>
      <Col xs={3}>
        <PxDataLayoutPane pxData={dataB}/>
      </Col>
      <Col xs={3}>
        <PxDataLayoutPane pxData={dataC}/>
      </Col>
      <Col xs={3}>
        <PxDataLayoutPane pxData={dataD}/>
      </Col>
    </Row>
  );
};
