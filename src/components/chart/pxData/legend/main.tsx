import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxData} from '../../../../types/pxData';
import {formatSignedNumber} from '../../../../utils/string';
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
    changeVal,
    changePct,
  } = legend;

  let diffClassName: LegendDataCellProps['useValueClass'] = 'neutral';
  if (changeVal) {
    if (changeVal > 0) {
      diffClassName = 'up';
    } else if (changeVal < 0) {
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
            value={`${formatSignedNumber(changeVal, decimals)} (${formatSignedNumber(changePct, 2)}%)`}
            decimals={decimals} useValueClass={diffClassName}
          />
        </Col>
      </Row>
    </div>
  );
};
