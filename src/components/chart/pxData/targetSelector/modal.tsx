import React, {CSSProperties} from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import {usePeriodDataSelector, useProductDataSelector} from '../../../../state/data/selector';
import {CommonSelectorModalProps} from './type';


export const TargetSelectorModal = ({show, setShow, pxData}: CommonSelectorModalProps) => {
  const products = useProductDataSelector();
  const periods = usePeriodDataSelector();

  const closeModal = () => setShow(false);

  const titleStyle: CSSProperties = {
    minWidth: '5rem',
    maxWidth: '5rem',
  };

  return (
    <Modal show={show} size="lg" onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>商品、週期選擇</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col>
            <ButtonGroup className="w-100 flex-wrap">
              <Button variant="outline-light" disabled style={titleStyle}>
                商品
              </Button>
              {Object.values(products).map(({name, symbol}) => (
                <Button key={symbol} variant="outline-light" active={pxData.contract.symbol === symbol}>
                  {`${name} - ${symbol}`}
                </Button>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <ButtonGroup className="w-100 flex-wrap">
              <Button variant="outline-light" disabled style={titleStyle}>
                週期
              </Button>
              {Object.values(periods).map(({name, min}) => (
                <Button key={min} variant="outline-light" active={pxData.periodSec / 60 === min}>
                  {name}
                </Button>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
