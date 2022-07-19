import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import {useProductDataSelector} from '../../../../state/data/selector';
import {pxDataDispatchers} from '../../../../state/pxData/dispatchers';
import {PxDataDispatcherName} from '../../../../state/pxData/types';
import {useDispatch} from '../../../../state/store';
import {titleStyle} from './const';
import {TargetSelectorButtonProps} from './type';


export const ProductSelector = ({slot, pxData, token, afterUpdate}: TargetSelectorButtonProps) => {
  const products = useProductDataSelector();
  const dispatch = useDispatch();

  return (
    <ButtonGroup className="w-100 flex-wrap">
      <Button variant="outline-light" disabled style={titleStyle}>
        商品
      </Button>
      {Object.values(products).map(({name, symbol}) => (
        <Button
          key={symbol}
          variant="outline-light"
          active={pxData.contract.symbol === symbol}
          onClick={() => {
            dispatch(pxDataDispatchers[PxDataDispatcherName.UPDATE_SLOT_MAP]({
              token,
              slot,
              symbol,
              periodMin: pxData.periodSec / 60,
            })).then(() => afterUpdate(`${symbol}@${pxData.periodSec / 60}`));
          }}
        >
          {`${name} - ${symbol}`}
        </Button>
      ))}
    </ButtonGroup>
  );
};
