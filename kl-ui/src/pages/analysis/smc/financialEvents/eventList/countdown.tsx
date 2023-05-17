import React from 'react';

import Countdown, {CountdownRendererFn} from 'react-countdown';

import styles from './main.module.scss';


const countdownRender: CountdownRendererFn = ({days, hours, minutes, seconds, completed}) => {
  if (completed) {
    return <span className={styles['countdown-complete-text']}>-</span>;
  }

  const totalHours = days * 24 + hours;
  const secondStr = seconds.toString().padStart(2, '0');

  if (totalHours < 1) {
    return <span className={styles['countdown-lt-3h-text']}>{`${totalHours * 60 + minutes}:${secondStr}`}</span>;
  }

  const minuteStr = minutes.toString().padStart(2, '0');

  return `${totalHours}:${minuteStr}:${secondStr}`;
};

type FinancialEventCountdownProps = {
  date: Date,
};

export const FinancialEventCountdown = ({date}: FinancialEventCountdownProps) => {
  return <Countdown date={date} renderer={countdownRender}/>;
};
