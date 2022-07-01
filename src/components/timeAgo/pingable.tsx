import React from 'react';

import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import {SocketContext} from '../../types/socket/socket';
import {TimeAgo} from './main';
import styles from './main.module.scss';
import {TimeAgoProps} from './type';


export const SocketPingableTimeAgo = React.forwardRef<HTMLSpanElement, TimeAgoProps>((
  props,
  ref,
) => {
  const socket = React.useContext(SocketContext);

  const [show, setShow] = React.useState(false);
  // Use ref instead of state because the state value in `onPong` is always 0
  const pingStart = React.useRef(0);
  const pingDuration = React.useRef(0);

  const onPong = () => {
    pingDuration.current = Date.now() - pingStart.current;
  };

  React.useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('ping', onPong);

    return () => {
      socket.off('ping', onPong);
    };
  }, [socket]);

  if (!socket) {
    return <></>;
  }

  const onOpen = () => {
    setShow(true);
    socket.emit('ping', '');
    pingStart.current =Date.now();
  };

  const onClose = () => {
    setShow(false);
    pingStart.current = 0;
    pingDuration.current = 0;
  };

  return (
    <>
      <TimeAgo {...props} ref={ref} onClick={onOpen}/>
      <Modal show={show} size="lg" onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>延遲測試</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="text-center">
            <Col>
              {
                pingDuration.current === 0 ?
                  <Spinner animation="border"/> :
                  <span className={styles['ping-text']}>
                    連線來回
                    <span className={styles['ping-ms']}>{pingDuration.current}</span>
                    毫秒
                  </span>
              }
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
});
SocketPingableTimeAgo.displayName = 'SocketPingableTimeAgo';
