import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxDataChart} from '../components/chart/pxData/main';
import {PxChartPayload} from '../components/chart/pxData/type';
import {PxStrengthIndicator} from '../components/strengthIndicator/main';
import {PxData} from '../types/pxData';


export type PxDataIndividualProps = {
  pxData: PxData,
  payload: PxChartPayload,
  title: string
};

export const PxDataIndividual = ({pxData, payload, title}: PxDataIndividualProps) => {
  return (
    <>
      <Row className="g-0 mb-2">
        <Col xs="auto">
          <h4 className="mb-0">
            {title}
          </h4>
        </Col>
        <Col>
          <Row className="g-2 text-end align-items-center">
            <Col>
              <PxStrengthIndicator index={-3}/>
              <PxStrengthIndicator index={-2}/>
              <PxStrengthIndicator index={-1}/>
              <PxStrengthIndicator index={0}/>
              <PxStrengthIndicator index={1}/>
              <PxStrengthIndicator index={2}/>
              <PxStrengthIndicator index={3}/>
            </Col>
          </Row>
        </Col>
      </Row>
      <hr className="my-2"/>
      <Row className="g-0 mb-2">
        <Col>
          <PxDataChart
            title={title}
            chartData={pxData}
            payload={payload}
            height={600}
          />
        </Col>
      </Row>
    </>
  );
};
