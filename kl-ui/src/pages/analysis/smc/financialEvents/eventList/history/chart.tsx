import React from 'react';

import format from 'date-fns/format';
import {FinancialEventHistoryEntry} from 'kl-web-common/models/api/info/financialEventHistory';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import styles from './main.module.scss';
import {FinancialEventHistoryTooltip} from './tooltip';
import {TextWithLoading} from '../../../../../../components/common/loading/text';
import {errorDispatchers} from '../../../../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../../../../state/error/types';
import {useDispatch} from '../../../../../../state/store';
import {apiGetEventHistory} from '../../../../../../utils/api/info/financialEvents';
import {isNotFetched, useFetchState} from '../../../../../../utils/fetch';


type Props = {
  symbol: string,
  isShown: boolean,
};

export const FinancialEventHistory = ({symbol, isShown}: Props) => {
  const dispatch = useDispatch();
  const {
    fetchStatus,
    fetchFunction: fetchData,
  } = useFetchState(
    [],
    (symbol: string) => apiGetEventHistory({
      symbol,
      onRetryAttempt: () => dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
        message: `${symbol} 的歷史資料要求逾時，重試中...`,
      })),
      onRetrySuccess: () => dispatch(errorDispatchers[ErrorDispatcherName.HIDE_ERROR]()),
    }),
    `無法獲取 ${symbol} 的歷史資料。`,
  );

  if (isShown) {
    fetchData({payload: symbol});
  }

  if (isNotFetched(fetchStatus)) {
    return <></>;
  }

  const {fetching, data} = fetchStatus;

  return (
    <div className={styles['history-chart']}>
      {
        fetching ?
          <TextWithLoading show>
            <span className="h3">
              獲取資料中...
            </span>
          </TextWithLoading> :
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="8 8" stroke="#616873"/>
              <XAxis
                dataKey={({date}: FinancialEventHistoryEntry) => new Date(date).getTime()}
                stroke="#81858A"
                tickFormatter={(epoch: number) => format(new Date(epoch), 'yyyy-MM-dd')}
              />
              <YAxis
                dataKey={({value}: FinancialEventHistoryEntry) => value}
                stroke="#81858A"
                // Default min domain is 0 - which in some economic data is not a good min
                domain={['auto', 'auto']}
                width={25}
              />
              <Tooltip
                wrapperStyle={{outline: 'none'}}
                content={<FinancialEventHistoryTooltip/>}
              />
              <Line
                type="linear"
                dataKey={({value}: FinancialEventHistoryEntry) => value}
                stroke="#c372fc"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
      }
    </div>
  );
};
