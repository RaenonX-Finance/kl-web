import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useAnimation} from '../../../../hooks/animation';
import {PxData} from '../../../../types/pxData';
import {formatSignedNumber} from '../../../../utils/string';
import {PxChartLegendData} from '../type';
import {LegendDataCell, LegendDataCellProps} from './cell';
import {strengthBorderStyleLookup, strengthIndicatorStyleLookup} from './const';
import styles from './main.module.scss';
import {useMockStrengthIdxGenerator} from './mock';


export type PxChartLegendProps = {
  data: PxData,
  legend: PxChartLegendData,
  title: string,
};

export const PxChartLegend = (props: PxChartLegendProps) => {
  const {legend, title} = props;
  const {
    open,
    high,
    low,
    close,
    decimals,
    changeVal,
    changePct,
  } = legend;

  const actualIndex = useMockStrengthIdxGenerator();
  const elemRef = useAnimation({
    deps: [actualIndex],
  });

  let diffClassName: LegendDataCellProps['useValueClass'] = 'neutral';
  if (changeVal) {
    if (changeVal > 0) {
      diffClassName = 'up';
    } else if (changeVal < 0) {
      diffClassName = 'down';
    }
  }

  return (
    <div className={`${styles['legend']} ${strengthBorderStyleLookup[actualIndex]}`}>
      <Row className="g-0">
        <Col xs="auto" className={`${styles['strength-indicator']} ${strengthIndicatorStyleLookup[actualIndex]}`}>
          <span ref={elemRef}>
            {formatSignedNumber(actualIndex, 0)}
          </span>
        </Col>
        <Col className={styles['main-content']}>
          <Row className="g-2">
            <Col className={styles['title']}>
              {title}
            </Col>
          </Row>
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
        </Col>
      </Row>
    </div>
  );
};
