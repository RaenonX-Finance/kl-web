import React from 'react';

import format from 'date-fns/format';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import styles from './main.module.scss';
import {errorDispatchers} from '../../../state/error/dispatchers';
import {useErrorSelector} from '../../../state/error/selector';
import {ErrorDispatcherName} from '../../../state/error/types';
import {useDispatch} from '../../../state/store';


export const ErrorToast = () => {
  const {show, message, timestamp} = useErrorSelector();
  const dispatch = useDispatch();

  return (
    <ToastContainer className="p-3" position="bottom-end">
      <Toast
        show={show} onClose={() => dispatch(errorDispatchers[ErrorDispatcherName.HIDE_ERROR]())}
        className={styles['error']}
      >
        <Toast.Header>
          <strong className="me-auto">錯誤</strong>
          {
            timestamp &&
            <small>{format(timestamp, 'yyyy-MM-dd HH:mm:ss')}</small>
          }
        </Toast.Header>
        <Toast.Body>
          {message.split('\n').map((str, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 ? <br/> : <></>}{str}
            </React.Fragment>
          ))}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
