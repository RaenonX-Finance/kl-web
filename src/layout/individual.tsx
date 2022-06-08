import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxDataChart} from '../components/chart/pxData/main';
import {PxChartPayload} from '../components/chart/pxData/type';
import {PxLastDayDiff} from '../components/lastDayDiff/main';
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
              <PxLastDayDiff data={pxData} dataKey="lastDayClose" prefix="LC"/>
              <PxLastDayDiff data={pxData} dataKey="todayOpen" prefix="CO"/>
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
