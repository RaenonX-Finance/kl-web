import React from 'react';

import {useAnimation} from '../../hooks/animation';
import {useEpochSecOffsetSelector} from '../../state/data/selector';
import styles from './main.module.scss';
import {getCurrentEpochSec} from './utils';


const getAnimationClassName = (secLeft: number): string => {
  if (secLeft < 10) {
    return styles['period-timer-closing'];
  }
  if (secLeft < 20) {
    return styles['period-timer-warning'];
  }
  return styles['period-timer-running'];
};

type Props = {
  periodSec: number,
};

export const PeriodTimer = ({periodSec}: Props) => {
  const epochSecOffset = useEpochSecOffsetSelector();
  const [secLeft, setSecLeft] = React.useState(
    periodSec - getCurrentEpochSec(epochSecOffset) % periodSec,
  );
  const secLeftElemRef = useAnimation({
    deps: [secLeft],
  });

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setSecLeft(periodSec - getCurrentEpochSec(epochSecOffset) % periodSec);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [epochSecOffset]);

  return (
    <span
      className={`${styles['period-timer']} ${getAnimationClassName(secLeft)}`}
      ref={secLeftElemRef}
    >
      <i className="bi bi-stopwatch"/>&nbsp;{secLeft.toFixed(0)}
    </span>
  );
};
