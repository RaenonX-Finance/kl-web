import React from 'react';

import Button from 'react-bootstrap/Button';

import {TargetSelectorModal} from './modal';
import {TargetSelectorCommonProps} from './type';
import {usePeriodDataSelector, useProductDataSelector} from '../../../../state/data/selector';


export const TargetSelector = (props: TargetSelectorCommonProps) => {
  const {pxData} = props;
  const products = useProductDataSelector();
  const periods = usePeriodDataSelector();
  const [show, setShow] = React.useState(false);

  return (
    <>
      <TargetSelectorModal show={show} setShow={setShow} {...props}/>
      <Button variant="outline-light" size="sm" onClick={() => setShow(true)}>
        {`${products[pxData.contract.symbol].name} @ ${periods[pxData.periodSec / 60].name}`}
      </Button>
    </>
  );
};
