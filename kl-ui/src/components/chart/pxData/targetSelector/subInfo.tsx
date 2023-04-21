import React from 'react';

import styles from './main.module.scss';
import {useProductDataSelector} from '../../../../state/data/selector';
import {PxDataMapValue} from '../../../../types/pxData';
import {formatSignedNumber} from '../../../../utils/string';


type Props = {
  pxData: PxDataMapValue,
};

export const TargetSelectorSubInfo = ({pxData}: Props) => {
  const products = useProductDataSelector();

  const latestMarket = pxData?.latestMarket;

  if (!pxData) {
    return <></>;
  }

  if (!latestMarket) {
    return <>{products[pxData.contract.symbol]?.sourceInfo.exchangeName}</>;
  }

  const {diffVal, diffPct} = latestMarket;

  let valueClass = styles['val-neutral'];
  let changeIcon = <i className="bi bi-dash-lg"/>;

  if (diffVal > 0) {
    valueClass = styles['val-up'];
    changeIcon = <i className="bi bi-caret-up-fill"/>;
  } else if (diffVal < 0) {
    valueClass = styles['val-down'];
    changeIcon = <i className="bi bi-caret-down-fill"/>;
  }

  return (
    <span className={valueClass}>
      日內&nbsp;
      {changeIcon}&nbsp;
      {`${formatSignedNumber(diffVal, pxData.contract.decimals)} (${formatSignedNumber(diffPct, 2)}%)`}
    </span>
  );
};
