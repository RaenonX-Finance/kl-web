import React from 'react';

import sortBy from 'lodash/sortBy';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {TargetSelectorButtonProps} from './type';
import {useProductDataSelector} from '../../../../state/data/selector';
import {TextWithLoading} from '../../../common/loading/text';


export const ProductSelector = ({
  updating,
  target,
  onClick,
}: TargetSelectorButtonProps) => {
  const products = useProductDataSelector();

  const onClickInternal = (symbol: string) => async () => {
    await onClick({symbol});
  };

  return (
    <ButtonGroup vertical className="w-100 flex-wrap">
      {sortBy(Object.values(products), ({sourceInfo, symbol}) => [sourceInfo.exchangeSymbol, symbol])
        .map(({name, symbol, sourceInfo}) => (
          <Button
            key={symbol}
            variant="outline-light"
            active={target.selected.symbol === symbol}
            disabled={updating}
            onClick={onClickInternal(symbol)}
          >
            <Row className="text-start">
              <Col xs={2}>
                <TextWithLoading show={updating && target.queued.symbol === symbol}>
                  {symbol}
                </TextWithLoading>
              </Col>
              <Col xs="auto">
                {name}
              </Col>
              <Col xs className="text-end">
                {`${sourceInfo.exchangeName} / ${sourceInfo.exchangeSymbol}`}
              </Col>
            </Row>
          </Button>
        ))}
    </ButtonGroup>
  );
};
