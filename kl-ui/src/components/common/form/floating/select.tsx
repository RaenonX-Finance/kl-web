import React from 'react';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import styles from './main.module.scss';
import {FloatingControlCommonProps} from './type';


type Props = React.InputHTMLAttributes<HTMLSelectElement> & FloatingControlCommonProps<HTMLSelectElement>;

export const FloatingSelect = React.memo(({label, children, ...props}: React.PropsWithChildren<Props>) => {
  return (
    <FloatingLabel label={label}>
      <Form.Select
        {...props}
        className={`${props.className} ${styles['override-autofill']}`}
      >
        {children}
      </Form.Select>
    </FloatingLabel>
  );
});

FloatingSelect.displayName = 'FloatingSelect';
