import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import {usePingSocket} from './hook';
import {TimeAgo} from './main';
import {SocketPingResultTable} from './pingResult';
import {TimeAgoProps} from './type';


export const SocketPingableTimeAgo = React.forwardRef<HTMLSpanElement, TimeAgoProps>((
  props,
  ref,
) => {
  const [show, setShow] = React.useState(false);
  const {completed, start, clear, setInUse, pingMs} = usePingSocket({count: 5});

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
          {
            !completed ?
              <div className="text-center"><Spinner animation="border"/></div> :
              <SocketPingResultTable pingMs={pingMs}/>
          }
        </Modal.Body>
      </Modal>
    </>
  );
});
SocketPingableTimeAgo.displayName = 'SocketPingableTimeAgo';
