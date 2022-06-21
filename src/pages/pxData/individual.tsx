import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxDataChart} from '../../components/chart/pxData/main';
import {PxChartPayload} from '../../components/chart/pxData/type';
import {PxStrengthIndicator} from '../../components/strengthIndicator/main';
import {StrengthIndex} from '../../components/strengthIndicator/type';
import {PxData} from '../../types/pxData';


type Props = {
  pxData: PxData,
  payload: PxChartPayload,
  title: string
};

export const PxDataIndividual = ({pxData, payload, title}: Props) => {
  // TEMP: ------ Temp RSI Start
  const [idx, setIdx] = React.useState(Math.floor(Date.now() / 1000 % 7));

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setIdx(Math.floor(Date.now() / 2000 % 7));
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const actualIndex = idx - 3 as StrengthIndex;
  // TEMP: ------ Temp RSI End

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
              <PxStrengthIndicator index={actualIndex}/>
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
