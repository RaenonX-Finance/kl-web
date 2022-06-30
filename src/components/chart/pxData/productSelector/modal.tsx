import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import {PxData} from '../../../../types/pxData';


type Props = {
  show: boolean,
  setModalShow: (show: boolean) => void,
  pxData: PxData,
};


export const ProductSelectorModal = ({show, setModalShow, pxData}: Props) => {
  const closeModal = () => setModalShow(false);

  return (
    <Modal show={show} size="lg" onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>商品、週期選擇</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <ButtonGroup className="mb-2" aria-label="First group">
              <Button variant="outline-light" disabled>商品</Button>
              {['小道瓊', '小那指', '台指期'].map((product, idx) => (
                <Button key={idx} variant="outline-light" active={pxData.contract.name === product}>{product}</Button>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <ButtonGroup className="mb-2" aria-label="First group">
              <Button variant="outline-light" disabled>週期</Button>
              {['1 分', '3 分', '5 分', '10 分', '15 分', '30 分', '60 分', '4 小時', '日'].map((period, idx) => (
                <Button key={idx} variant="outline-light" active={period === '1 分'}>{period}</Button>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
