import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {LegendDataCell, LegendDataCellProps} from './cell';
import {momentumIndicatorStyleLookup} from './const';
import styles from './main.module.scss';
import {useAnimation} from '../../../../hooks/animation';
import {formatSignedNumber} from '../../../../utils/string';
import {PxChartLegendData} from '../type';


type Props = {
  legend: PxChartLegendData,
};

export const PxChartLegend = ({legend}: Props) => {
  const {
    open,
    high,
    low,
    close,
    decimals,
    changeVal,
    changePct,
    momentum,
    tiePoint,
  } = legend;

  const animationRef = useAnimation({deps: [momentum]});

  let diffClassName: LegendDataCellProps['useValueClass'] = 'neutral';
  if (changeVal) {
    if (changeVal > 0) {
      diffClassName = 'up';
    } else if (changeVal < 0) {
      diffClassName = 'down';
    }
  }

  return (
    <div className={styles['legend']}>
      <Row className="g-0">
        <Col
          xs="auto"
          className={`${styles['momentum-indicator']} ${momentumIndicatorStyleLookup[momentum]}`}
        >
          <span ref={animationRef}>
            {Math.abs(momentum)}
          </span>
        </Col>
        <Col className={styles['main-content']}>
          <Row>
            <Col className="d-inline">
              <LegendDataCell title="多空" value={tiePoint} decimals={decimals} large className={styles['tie-point']}/>
              <LegendDataCell title="開" value={open} decimals={decimals}/>
              <LegendDataCell title="高" value={high} decimals={decimals}/>
              <LegendDataCell title="低" value={low} decimals={decimals}/>
              <LegendDataCell title="收" value={close} decimals={decimals} large/>
              <LegendDataCell
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
