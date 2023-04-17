import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import {TargetSelectorButtonProps} from './type';
import {usePeriodDataSelector} from '../../../../state/data/selector';
import {TextWithLoading} from '../../../common/loading/text';


export const PeriodSelector = ({
  updating,
  target,
  onClick,
}: TargetSelectorButtonProps) => {
  const periods = usePeriodDataSelector();

  const onClickInternal = (periodMin: number) => async () => {
    await onClick({periodMin});
  };

  return (
    <ButtonGroup className="w-100 flex-wrap">
      {Object.values(periods).map(({name, min: periodMin}) => (
        <Button
          key={periodMin}
          variant="outline-light"
          active={target.selected.periodMin === periodMin}
          disabled={updating}
          onClick={onClickInternal(periodMin)}
        >
          <TextWithLoading show={updating && target.queued.periodMin === periodMin}>
            {name}
          </TextWithLoading>
        </Button>
      ))}
    </ButtonGroup>
  );
};
