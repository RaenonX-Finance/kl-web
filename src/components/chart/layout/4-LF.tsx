import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout4ofLF = ({pxDataMap}: LayoutProps) => {
  const dataA = pxDataMap['A'];
  const dataB = pxDataMap['B'];
  const dataC = pxDataMap['C'];
  const dataD = pxDataMap['D'];

  return (
    <Row className="h-100 g-2">
      <Col xs={6} className="pb-2">
        <PxDataLayoutPane pxData={dataA}/>
      </Col>
      <Col xs={6}>
        <Row className="h-33 g-2 mb-2">
          <Col>
            <PxDataLayoutPane pxData={dataB}/>
          </Col>
        </Row>
        <Row className="h-33 g-2 mb-2">
          <Col>
            <PxDataLayoutPane pxData={dataC}/>
          </Col>
        </Row>
        <Row className="h-33 g-2">
          <Col>
            <PxDataLayoutPane pxData={dataD}/>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
