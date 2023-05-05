import React from 'react';

import format from 'date-fns/format';
import {FinancialEventHistoryEntry} from 'kl-web-common/models/api/info/financialEventHistory';
import {TooltipProps} from 'recharts';

import styles from './main.module.scss';


export const FinancialEventHistoryTooltip = ({active, payload}: TooltipProps<number, string>) => {
  if (!active || !payload || !payload.length) {
    return <></>;
  }

  const [{payload: dataFromPayload}] = payload;
  const {date, value} = dataFromPayload as FinancialEventHistoryEntry;

  return (
    <div className={styles['tooltip']}>
      <p className="mb-1">{format(new Date(date), 'yyyy-MM-dd')}</p>
      <span className="h4">
        {value}
      </span>
    </div>
  );
};
