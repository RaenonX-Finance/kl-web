import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import {DataState} from '../../../../../state/data/types';
import {CommonSelectorModalProps} from '../type';


type Props = CommonSelectorModalProps & {
  periods: DataState['periods'],
};

export const PeriodSelectorModal = ({show, setModalShow, pxData, periods}: Props) => {
  const closeModal = () => setModalShow(false);

  return (
    <Modal show={show} size="lg" onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>週期選擇</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <ButtonGroup className="mb-2">
              {Object.values(periods).map(({name, min}, idx) => (
                <Button key={idx} variant="outline-light" active={pxData.periodSec / 60 === min}>
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
