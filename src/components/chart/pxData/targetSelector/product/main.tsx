import React from 'react';

import Button from 'react-bootstrap/Button';

import {useProductDataSelector} from '../../../../../state/data/selector';
import {CommonSelectorProps} from '../type';
import {ProductSelectorModal} from './modal';


export const ProductSelector = ({pxData}: CommonSelectorProps) => {
  const products = useProductDataSelector();
  const [show, setShow] = React.useState(false);

  return (
    <>
      <ProductSelectorModal show={show} setModalShow={setShow} pxData={pxData} products={products}/>
      <Button size="sm" variant="outline-light" onClick={() => setShow(true)}>
        {products[pxData.contract.symbol]?.name || pxData.contract.symbol}
      </Button>
    </>
  );
};
