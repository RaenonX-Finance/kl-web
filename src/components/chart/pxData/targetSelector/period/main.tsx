import React from 'react';

import Button from 'react-bootstrap/Button';

import {usePeriodDataSelector} from '../../../../../state/data/selector';
import {PxData} from '../../../../../types/pxData';
import {PeriodSelectorModal} from './modal';


type Props = {
  pxData: PxData,
};

export const PeriodSelector = ({pxData}: Props) => {
  const periods = usePeriodDataSelector();
  const [show, setShow] = React.useState(false);

  return (
    <>
      <PeriodSelectorModal show={show} setModalShow={setShow} pxData={pxData} periods={periods}/>
      <Button size="sm" variant="outline-light" onClick={() => setShow(true)}>
        {periods[pxData.periodSec / 60].name}
      </Button>
    </>
  );
};
