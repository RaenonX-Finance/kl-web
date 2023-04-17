import React from 'react';

import styles from './main.module.scss';


type Props = {
  change: number,
};

export const OptionsOiChangeText = ({change}: Props) => {
  const changeValText = change !== 0 ?
    `${change > 0 ? '+' : ''}${change}` :
    '-';

  let changeValTextClass;
  if (change > 0) {
    changeValTextClass = styles['oi-inc'];
  } else if (change < 0) {
    changeValTextClass = styles['oi-dec'];
  } else {
    changeValTextClass = styles['oi-neut'];
  }

  return (
    <span className={changeValTextClass}>
      {changeValText}
    </span>
  );
};
