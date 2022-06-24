import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout3of1x3 = ({pxDataMap}: LayoutProps) => {
  const dataA = pxDataMap['A'];
  const dataB = pxDataMap['B'];
  const dataC = pxDataMap['C'];

  return (
    <>
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
    </>
  );
};
