import React from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';

import {PxData} from '../../../../types/pxData';
import {PeriodSelector} from './period/main';
import {ProductSelector} from './product/main';


type Props = {
  pxData: PxData,
};

export const TargetSelector = ({pxData}: Props) => {
  return (
    <ButtonGroup>
      <ProductSelector pxData={pxData}/>
      <PeriodSelector pxData={pxData}/>
    </ButtonGroup>
  );
};
