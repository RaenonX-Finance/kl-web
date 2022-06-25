import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout4ofR2 = ({pxDataMap}: LayoutProps) => {
  const dataA = pxDataMap['A'];
  const dataB = pxDataMap['B'];
  const dataC = pxDataMap['C'];
  const dataD = pxDataMap['D'];

  return (
    <Row className="h-100 g-2">
      <Col xs={4}>
        <Row className="h-50 g-2 mb-2">
          <Col>
            <PxDataLayoutPane pxData={dataA}/>
          </Col>
        </Row>
        <Row className="h-50 g-2">
          <Col>
            <PxDataLayoutPane pxData={dataB}/>
          </Col>
        </Row>
      </Col>
      <Col xs={4} className="pb-2">
        <PxDataLayoutPane pxData={dataC}/>
      </Col>
      <Col xs={4} className="pb-2">
        <PxDataLayoutPane pxData={dataD}/>
      </Col>
    </Row>
  );
};
