import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxDataLayoutPane} from './pxData';
import {LayoutProps} from './type';


export const Layout1of1x1 = ({pxDataMap}: LayoutProps) => {
  const dataA = pxDataMap['A'];

  return (
    <Row>
      <Col>
        <PxDataLayoutPane pxData={dataA}/>
      </Col>
    </Row>
  );
};
