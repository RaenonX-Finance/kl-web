import React from 'react';

import Modal from 'react-bootstrap/Modal';

import {PING_TEST_COUNT} from './const';
import {usePingSocket} from './hook';
import {TimeAgo} from './main';
import {SocketPingResult} from './pingResult';
import {TimeAgoProps} from './type';


export const SocketPingableTimeAgo = React.forwardRef<HTMLSpanElement, TimeAgoProps>((
  props,
  ref,
) => {
  const [show, setShow] = React.useState(false);
  const {pingCount, start, clear, setInUse, pingMs} = usePingSocket({count: PING_TEST_COUNT});

  const onOpen = () => {
    setShow(true);
    setInUse(true);
    start();
  };

  const onClose = () => {
    setShow(false);
    setInUse(false);
    clear();
  };

  return (
    <>
      <TimeAgo {...props} ref={ref} onClick={onOpen}/>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>延遲測試</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SocketPingResult pingCount={pingCount} pingMs={pingMs}/>
        </Modal.Body>
      </Modal>
    </>
  );
});
SocketPingableTimeAgo.displayName = 'SocketPingableTimeAgo';
