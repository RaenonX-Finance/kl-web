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

  // `products` and `periods` could be an empty map on init because the product info returns slower
  const symbol = products[pxData.contract.symbol]?.name ?? pxData.contract.symbol;
  const periodMin = pxData.periodSec / 60;
  const period = periods[periodMin]?.name ?? periodMin;

  return (
    <>
      <TargetSelectorModal show={show} setShow={setShow} {...props}/>
      <Button variant="outline-light" size="sm" onClick={() => setShow(true)}>
        {`${symbol} @ ${period}`}
      </Button>
    </>
  );
};
