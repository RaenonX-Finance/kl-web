import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxData} from '../../../../types/pxData';
import {PxChartLegendData} from '../type';
import {LegendDataCell, LegendDataCellProps} from './cell';
import styles from './main.module.scss';


export type PxChartLegendProps = {
  data: PxData,
  legend: PxChartLegendData,
};

export const PxChartLegend = (props: PxChartLegendProps) => {
  const {legend} = props;
  const {
    open,
    high,
    low,
    close,
    decimals,
  } = legend;

  // Not using diff from PxData because it is slightly lagged
  // > PxData not updated when market data updated
  const diff = close - open;

  let diffClassName: LegendDataCellProps['useValueClass'] = 'neutral';
  if (diff) {
    if (diff > 0) {
      diffClassName = 'up';
    } else if (diff < 0) {
      diffClassName = 'down';
    }
  }

  return (
    <div className={`${styles['legend']} ${styles[`diff-${diffClassName}`]}`}>
      <Row>
        <Col className="d-inline">
          <LegendDataCell title="開" value={open} decimals={decimals}/>
          <LegendDataCell title="高" value={high} decimals={decimals}/>
          <LegendDataCell title="低" value={low} decimals={decimals}/>
          <LegendDataCell title="收" value={close} decimals={decimals} large/>
          <LegendDataCell
            title={<i className="bi bi-plus-slash-minus"/>}
            value={diff} decimals={decimals} useValueClass
          />
        </Col>
      </Row>
    </div>
  );
};
