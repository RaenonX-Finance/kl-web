import React from 'react';

import maxBy from 'lodash/maxBy';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Countdown, {CountdownRendererFn} from 'react-countdown';

import styles from './main.module.scss';
import {OptionsOiChartSingleProps} from './single';
import {bearColor, bullColor} from '../../../../../../components/chart/pxData/plot/const';


const countdownRender: CountdownRendererFn = ({days, hours, minutes, seconds}) => {
  const minuteStr = minutes.toString().padStart(2, '0');
  const secondStr = seconds.toString().padStart(2, '0');

  return `最後更新於 ${days * 24 + hours} 時 ${minuteStr} 分 ${secondStr} 秒前`;
};

export const OptionsOiMeta = ({data}: OptionsOiChartSingleProps) => {
  const {contractSymbol, lastUpdate, data: oiData} = data;

  const maxCall = maxBy(oiData, (data) => data.call.oiCurrent);
  const maxPut = maxBy(oiData, (data) => data.put.oiCurrent);

  const maxCallOi = Number(maxCall?.call.oiCurrent);
  const maxPutOi = Number(maxPut?.put.oiCurrent);
  const maxOiTotal = maxCallOi + maxPutOi;

  return (
    <>
      <Row className="text-center mb-2 g-2 justify-content-center">
        <Col xs={{span: 6}} md={{order: 'first', span: 'auto'}} className={styles['oi-max-call']}>
          Call 最大量
          <br/>
          <span>
            {maxCall?.strike}
          </span>
        </Col>
        <Col xs={{order: 'first', span: 12}} md={3} className="align-self-center">
          <span className="h3">{contractSymbol}</span>
        </Col>
        <Col xs={{span: 6}} md={{span: 'auto'}} className={styles['oi-max-put']}>
          Put 最大量
          <br/>
          <span>
            {maxPut?.strike}
          </span>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <ProgressBar>
            <ProgressBar
              style={{backgroundColor: bullColor}} now={maxCallOi}
              label={`${(maxCallOi / maxOiTotal * 100).toFixed(2)}%`}
            />
            <ProgressBar
              style={{backgroundColor: bearColor}} now={maxPutOi}
              label={`${(maxPutOi / maxOiTotal * 100).toFixed(2)}%`}
            />
          </ProgressBar>
        </Col>
      </Row>
      <Row className="text-end">
        <Col>
          <Countdown
            date={lastUpdate}
            renderer={countdownRender}
            overtime
          />
        </Col>
      </Row>
    </>
  );
};
