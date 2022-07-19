import React from 'react';

import {useSession} from 'next-auth/react';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import {GeneralSocketContext} from '../../../../hooks/socket/general/const';
import {PxInitMessage} from '../../../../hooks/socket/general/type';
import {PxDataUniqueIdentifier} from '../../../../types/pxData';
import {PeriodSelector} from './period';
import {ProductSelector} from './product';
import {TargetSelectorCommonProps} from './type';


type Props = TargetSelectorCommonProps & {
  show: boolean,
  setShow: (show: boolean) => void,
};

export const TargetSelectorModal = ({show, setShow, slot, pxData}: Props) => {
  const {data} = useSession();
  const socket = React.useContext(GeneralSocketContext);

  const token = data?.user?.token;

  const afterUpdate = (identifier: PxDataUniqueIdentifier) => {
    setShow(false);

    if (!socket) {
      throw Error(`Socket is [null], cannot request px data of [${identifier}]`);
    }

    const message: PxInitMessage = {
      token: data?.user?.token,
      identifiers: [identifier],
    };
    socket.emit('pxInit', JSON.stringify(message));
  };

  if (!token) {
    return <></>;
  }

  return (
    <Modal show={show} size="lg" onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>商品、週期選擇</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col>
            <ProductSelector pxData={pxData} slot={slot} token={token} afterUpdate={afterUpdate}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <PeriodSelector pxData={pxData} slot={slot} token={token} afterUpdate={afterUpdate}/>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
