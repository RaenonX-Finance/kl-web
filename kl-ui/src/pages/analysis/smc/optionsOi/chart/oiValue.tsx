import React from 'react';

import styles from './main.module.scss';


type Props = {
  value: number,
  isMaxCall?: boolean,
  isMaxPut?: boolean,
};

export const OptionsOiValueText = ({value, isMaxCall, isMaxPut}: Props) => {
  return (
    <span className={`${isMaxCall ? styles['max-call'] : ''} ${isMaxPut ? styles['max-put'] : ''}`}>
      {value}
    </span>
  );
};
