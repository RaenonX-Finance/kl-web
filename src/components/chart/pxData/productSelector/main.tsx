import React from 'react';

import Button from 'react-bootstrap/Button';

import {PxData} from '../../../../types/pxData';
import {ProductSelectorModal} from './modal';


type Props = {
  title: string,
  pxData: PxData,
};

export const ProductSelector = ({title, pxData}: Props) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <ProductSelectorModal show={show} setModalShow={setShow} pxData={pxData}/>
      <Button size="sm" variant="outline-light" onClick={() => setShow(true)}>
        {title}
      </Button>
    </>
  );
};
