import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout2of1x2 = ({pxDataMap}: LayoutProps) => {
  const dataA = pxDataMap['A'];
  const dataB = pxDataMap['B'];

  return (
    <>
      <Row className="h-50 g-2 pb-3">
        <Col>
          <PxDataLayoutPane pxData={dataA}/>
        </Col>
      </Row>
      <Row className="h-50 g-2">
        <Col>
          <PxDataLayoutPane pxData={dataB}/>
        </Col>
      </Row>
    </>
  );
};
