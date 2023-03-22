import React from 'react';

import {OptionsOiSingleSide} from 'kl-web-common/models/api/info/optionsOi';

import styles from './main.module.scss';


type Props = {
  data: OptionsOiSingleSide,
  isMaxCall?: boolean,
  isMaxPut?: boolean,
};

// eslint-disable-next-line new-cap
const formatter = Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

export const OptionsOiInfoText = ({data, isMaxCall, isMaxPut}: Props) => {
  const {oiCurrent, oiChangeVal} = data;

  const changeValText = oiChangeVal !== 0 ?
    `${oiChangeVal > 0 ? '+' : ''}${formatter.format(oiChangeVal)}` :
    '-';

  let changeValTextClass;
  if (oiChangeVal > 0) {
    changeValTextClass = styles['oi-inc'];
  } else if (oiChangeVal < 0) {
    changeValTextClass = styles['oi-dec'];
  } else {
    changeValTextClass = styles['oi-neut'];
  }

  return (
    <span className={styles['oi-info']}>
      <span className={`${isMaxCall ? styles['max-call'] : ''} ${isMaxPut ? styles['max-put'] : ''}`}>
        {formatter.format(oiCurrent)}
      </span>
      &nbsp;
      <span className={changeValTextClass}>
        {changeValText}
      </span>
    </span>
  );
};
