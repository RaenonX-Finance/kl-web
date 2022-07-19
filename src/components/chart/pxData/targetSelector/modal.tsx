import React from 'react';

import {useSession} from 'next-auth/react';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import {PeriodSelector} from './period';
import {ProductSelector} from './product';
import {TargetSelectorCommonProps} from './type';


type Props = TargetSelectorCommonProps & {
  show: boolean,
  setShow: (show: boolean) => void,
};

export const TargetSelectorModal = ({show, setShow, slot, pxData}: Props) => {
  const {data} = useSession();

  const token = data?.user?.token;

  const closeModal = () => setShow(false);

  if (!token) {
    return <></>;
  }

  return (
    <Modal show={show} size="lg" onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>商品、週期選擇</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col>
            <ProductSelector pxData={pxData} slot={slot} token={token} closeModal={closeModal}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <PeriodSelector pxData={pxData} slot={slot} token={token} closeModal={closeModal}/>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
