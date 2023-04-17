import React from 'react';

import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import {PING_TEST_COUNT} from './const';
import {usePingSocket} from './hook';
import {TimeAgo} from './main';
import {SocketPingResult} from './pingResult';
import {TimeAgoProps} from './type';
import {AccountSocketContext} from '../../hooks/socket/account/const';
import {PxSocketContext} from '../../hooks/socket/px/const';


export const SocketPingableTimeAgo = React.forwardRef<HTMLSpanElement, TimeAgoProps>((
  props,
  ref,
) => {
  const [show, setShow] = React.useState(false);
  const accountSocket = React.useContext(AccountSocketContext);
  const accountPing = usePingSocket({
    socket: accountSocket,
    count: PING_TEST_COUNT,
  });
  const pxSocket = React.useContext(PxSocketContext);
  const pxPing = usePingSocket({
    socket: pxSocket,
    count: PING_TEST_COUNT,
  });

  const onOpen = () => {
    setShow(true);
    accountPing.setInUse(true);
    accountPing.start();
    pxPing.setInUse(true);
    pxPing.start();
  };

  const onClose = () => {
    setShow(false);
    accountPing.setInUse(false);
    accountPing.clear();
    pxPing.setInUse(false);
    pxPing.clear();
  };

  return (
    <>
      <TimeAgo {...props} ref={ref} onClick={onOpen}/>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>延遲測試</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <SocketPingResult title="帳號管理" pingCount={accountPing.pingCount} pingMs={accountPing.pingMs}/>
            </Col>
            <Col>
              <SocketPingResult title="報價" pingCount={pxPing.pingCount} pingMs={pxPing.pingMs}/>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
});
SocketPingableTimeAgo.displayName = 'SocketPingableTimeAgo';
