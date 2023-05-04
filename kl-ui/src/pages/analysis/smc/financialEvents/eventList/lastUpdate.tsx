import React from 'react';

import Countdown, {CountdownRendererFn} from 'react-countdown';

import styles from './main.module.scss';


const countdownRender: CountdownRendererFn = ({days, hours, minutes, seconds}) => {
  const totalHours = days * 24 + hours;
  const totalMinutes = totalHours * 60;

  if (totalMinutes < 3) {
    return `${totalMinutes * 60 + seconds} 秒前更新`;
  }

  if (totalHours < 1) {
    return `${totalHours * 60 + minutes} 分前更新`;
  }

  if (days < 3) {
    return `${totalHours} 小時前更新`;
  }

  return `${totalHours} 天前更新`;
};

type FinancialEventCountdownProps = {
  date: Date,
};

export const FinancialEventLastUpdate = ({date}: FinancialEventCountdownProps) => {
  return (
    <span className={styles['last-update']}>
      <Countdown date={date} renderer={countdownRender} overtime/>
    </span>
  );
};
