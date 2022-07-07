import React from 'react';

import Modal from 'react-bootstrap/Modal';

import {errorDispatchers} from '../../state/error/dispatchers';
import {useErrorSelector} from '../../state/error/selector';
import {ErrorDispatcherName} from '../../state/error/types';
import {useDispatch} from '../../state/store';


export const ErrorPopup = () => {
  const {show, message} = useErrorSelector();
  const dispatch = useDispatch();

  // TODO: Style
  return (
    <Modal show={show} onHide={() => dispatch(errorDispatchers[ErrorDispatcherName.HIDE_ERROR]())}>
      <Modal.Header closeButton>
        <Modal.Title>錯誤</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
    </Modal>
  );
};
