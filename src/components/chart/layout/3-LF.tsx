import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout3ofLF = ({pxDataMap}: LayoutProps) => {
  const dataA = pxDataMap['A'];
  const dataB = pxDataMap['B'];
  const dataC = pxDataMap['C'];

  return (
    <Row className="g-2">
      <Col>
        <PxDataLayoutPane pxData={dataA}/>
      </Col>
      <Col>
        <Row className="g-2 mb-2">
          <Col>
            <PxDataLayoutPane pxData={dataB}/>
          </Col>
        </Row>
        <Row className="g-2">
          <Col>
            <PxDataLayoutPane pxData={dataC}/>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
