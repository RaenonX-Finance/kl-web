import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import {usePeriodDataSelector} from '../../../../state/data/selector';
import {pxDataDispatchers} from '../../../../state/pxData/dispatchers';
import {PxDataDispatcherName} from '../../../../state/pxData/types';
import {useDispatch} from '../../../../state/store';
import {titleStyle} from './const';
import {TargetSelectorButtonProps} from './type';


export const PeriodSelector = ({slot, pxData, token, closeModal}: TargetSelectorButtonProps) => {
  const periods = usePeriodDataSelector();
  const dispatch = useDispatch();

  return (
    <ButtonGroup className="w-100 flex-wrap">
      <Button variant="outline-light" disabled style={titleStyle}>
        週期
      </Button>
      {Object.values(periods).map(({name, min: periodMin}) => (
        <Button
          key={periodMin}
          variant="outline-light"
          active={pxData.periodSec / 60 === periodMin}
          onClick={() => {
            dispatch(pxDataDispatchers[PxDataDispatcherName.UPDATE_SLOT_MAP]({
              token,
              slot,
              symbol: pxData.contract.symbol,
              periodMin,
            }));
            closeModal();
          }}
        >
          {name}
        </Button>
      ))}
    </ButtonGroup>
  );
};
