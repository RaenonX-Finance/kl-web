import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import {DataState} from '../../../../../state/data/types';
import {CommonSelectorModalProps} from '../type';


type Props = CommonSelectorModalProps & {
  products: DataState['products'],
};

export const ProductSelectorModal = ({show, setModalShow, pxData, products}: Props) => {
  const closeModal = () => setModalShow(false);

  return (
    <Modal show={show} size="lg" onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>商品選擇</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <ButtonGroup className="mb-2">
              {Object.values(products).map(({name, symbol}, idx) => (
                <Button key={idx} variant="outline-light" active={pxData.contract.symbol === symbol}>
                  {`${name} (${symbol})`}
                </Button>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
