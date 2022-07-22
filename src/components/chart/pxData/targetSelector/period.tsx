import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import {usePeriodDataSelector} from '../../../../state/data/selector';
import {errorDispatchers} from '../../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../../state/error/types';
import {pxDataDispatchers} from '../../../../state/pxData/dispatchers';
import {PxDataDispatcherName} from '../../../../state/pxData/types';
import {useDispatch} from '../../../../state/store';
import {TextWithLoading} from '../../../common/loading/text';
import {titleStyle} from './const';
import {TargetSelectorButtonProps} from './type';


export const PeriodSelector = ({
  disabled,
  slot,
  pxData,
  token,
  beforeUpdate,
  afterUpdate,
}: TargetSelectorButtonProps) => {
  const periods = usePeriodDataSelector();
  const dispatch = useDispatch();
  const [updatingPeriodMin, setUpdatingPeriodMin] = React.useState<number | null>(null);

  const onClick = (periodMin: number) => async () => {
    setUpdatingPeriodMin(periodMin);
    beforeUpdate();

    try {
      await dispatch(pxDataDispatchers[PxDataDispatcherName.UPDATE_SLOT_MAP]({
        token,
        slot,
        symbol: pxData.contract.symbol,
        periodMin,
      }));
    } catch (error) {
      if (typeof error === 'string') {
        dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: error}));
      }
      console.error(error);
    } finally {
      afterUpdate(`${pxData.contract.symbol}@${periodMin}`);
      setUpdatingPeriodMin(null);
    }
  };

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
          disabled={disabled}
          onClick={onClick(periodMin)}
        >
          <TextWithLoading show={disabled && periodMin === updatingPeriodMin} text={name}/>
        </Button>
      ))}
    </ButtonGroup>
  );
};
