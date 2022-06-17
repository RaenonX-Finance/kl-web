import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {ErrorPopup} from '../components/error/main';
import {useSocketInit} from '../hooks/socket/init';
import {useCustomSrSelector} from '../state/customSr/selector';
import {usePxDataSelector} from '../state/pxData/selector';
import {PxData} from '../types/pxData';
import {getPxDataTitle} from '../utils/pxData';
import {PxDataAlwaysShow} from './alwaysShow';
import {PxDataCollapsible} from './collapsible';
import {PxDataIndividualProps} from './individual';
import styles from './main.module.scss';


export const PxDataMain = () => {
  const pxData = usePxDataSelector();
  const customSrLevels = useCustomSrSelector();

  useSocketInit();

  const getIndividualProps = (data: PxData): PxDataIndividualProps => ({
    pxData: data,
    title: getPxDataTitle(data),
    payload: {
      customSrLevels: customSrLevels[data.contract.symbol],
    },
  });

  const sortedPxData = Object.values(pxData)
    .sort((a, b) => (
      a.contract.symbol.localeCompare(b.contract.symbol) ||
      a.periodSec - b.periodSec
    ));

  // TODO: Temporary change
  const majorPxData = sortedPxData.filter(() => true);
  const minorPxData = sortedPxData.filter(() => false);

  return (
    <>
      <ErrorPopup/>
      <Row className="fixed-top">
        <Col>
          <div className={styles['sub-px-data-bar']}>
            {minorPxData.map((data) => (
              <PxDataCollapsible key={data.uniqueIdentifier} {...getIndividualProps(data)}/>
            ))}
          </div>
        </Col>
      </Row>
      <Row className="mt-5 g-3">
        {majorPxData.map((data) => (
          <Col key={data.uniqueIdentifier} xs={6}>
            <PxDataAlwaysShow {...getIndividualProps(data)}/>
          </Col>
        ))}
      </Row>
    </>
  );
};
