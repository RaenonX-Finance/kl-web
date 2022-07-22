import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import {useProductDataSelector} from '../../../../state/data/selector';
import {errorDispatchers} from '../../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../../state/error/types';
import {pxDataDispatchers} from '../../../../state/pxData/dispatchers';
import {PxDataDispatcherName} from '../../../../state/pxData/types';
import {useDispatch} from '../../../../state/store';
import {TextWithLoading} from '../../../common/loading/text';
import {titleStyle} from './const';
import {TargetSelectorButtonProps} from './type';


export const ProductSelector = ({
  disabled,
  slot,
  pxData,
  token,
  beforeUpdate,
  afterUpdate,
}: TargetSelectorButtonProps) => {
  const products = useProductDataSelector();
  const dispatch = useDispatch();
  const [updatingSymbol, setUpdatingSymbol] = React.useState<string | null>(null);

  const onClick = (symbol: string) => async () => {
    setUpdatingSymbol(symbol);
    beforeUpdate();

    try {
      await dispatch(pxDataDispatchers[PxDataDispatcherName.UPDATE_SLOT_MAP]({
        token,
        slot,
        symbol,
        periodMin: pxData.periodSec / 60,
      }));
    } catch (error) {
      if (typeof error === 'string') {
        dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: error}));
      }
      console.error(error);
    } finally {
      afterUpdate(`${symbol}@${pxData.periodSec / 60}`);
      setUpdatingSymbol(null);
    }
  };

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
          disabled={disabled}
          onClick={onClick(symbol)}
        >
          <TextWithLoading show={disabled && symbol === updatingSymbol} text={`${name} - ${symbol}`}/>
        </Button>
      ))}
    </ButtonGroup>
  );
};
