import React from 'react';

import Button from 'react-bootstrap/Button';

import {usePeriodDataSelector, useProductDataSelector} from '../../../../state/data/selector';
import {PxData} from '../../../../types/pxData';
import {TargetSelectorModal} from './modal';


type Props = {
  pxData: PxData,
};

export const TargetSelector = ({pxData}: Props) => {
  const products = useProductDataSelector();
  const periods = usePeriodDataSelector();
  const [show, setShow] = React.useState(false);

  return (
    <>
      <TargetSelectorModal show={show} setShow={setShow} pxData={pxData}/>
      <Button variant="outline-light" size="sm" onClick={() => setShow(true)}>
        {`${products[pxData.contract.symbol].name} @ ${periods[pxData.periodSec / 60].name}`}
      </Button>
    </>
  );
};
