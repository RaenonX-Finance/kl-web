import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout4ofRF = ({pxDataMap}: LayoutProps) => {
  const dataA = pxDataMap['A'];
  const dataB = pxDataMap['B'];
  const dataC = pxDataMap['C'];
  const dataD = pxDataMap['D'];

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <PxDataLayoutPane pxData={dataA}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <PxDataLayoutPane pxData={dataB}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <PxDataLayoutPane pxData={dataC}/>
          </Col>
        </Row>
      </Col>
      <Col>
        <PxDataLayoutPane pxData={dataD}/>
      </Col>
    </Row>
  );
};
