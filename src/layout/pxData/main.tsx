import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {ErrorPopup} from '../../components/error/popup';
import {PxDataSocketContext} from '../../hooks/socket/px/context';
import {useCustomSrSelector} from '../../state/customSr/selector';
import {usePxDataSelector} from '../../state/pxData/selector';
import {getPxDataTitle} from '../../utils/pxData';
import {PxDataIndividual} from './individual';


export const PxDataMain = () => {
  const pxData = usePxDataSelector();
  const customSrLevels = useCustomSrSelector();

  const sortedPxData = Object.values(pxData)
    .sort((a, b) => (
      a.contract.symbol.localeCompare(b.contract.symbol) ||
      a.periodSec - b.periodSec
    ));

  return (
    <PxDataSocketContext>
      <ErrorPopup/>
      <Row className="g-3">
        {sortedPxData.map((data) => (
          <Col key={data.uniqueIdentifier} md={6}>
            <PxDataIndividual
              pxData={data}
              title={getPxDataTitle(data)}
              payload={{
                customSrLevels: customSrLevels[data.contract.symbol],
              }}
            />
          </Col>
        ))}
      </Row>
    </PxDataSocketContext>
  );
};
