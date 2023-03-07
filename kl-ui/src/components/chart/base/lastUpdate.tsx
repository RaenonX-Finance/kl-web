import React from 'react';

import styles from './main.module.scss';
import {useAnimation} from '../../../hooks/animation';
import {useLastPxUpdateSelector} from '../../../state/data/selector';
import {SocketPingableTimeAgo} from '../../timeAgo/pingable';


type Props = {
  security: string,
};

export const PxChartLastUpdate = ({security}: Props) => {
  const lastUpdate = useLastPxUpdateSelector(security);
  const updateIndicatorRef = useAnimation({deps: [lastUpdate], minReplayMs: 2000});

  return (
    <SocketPingableTimeAgo
      ref={updateIndicatorRef}
      epochMs={lastUpdate}
      format={(secDiffMs) => (
        <><i className="bi bi-activity"/>&nbsp;{secDiffMs.toFixed(0)}</>
      )}
      updateMs={100}
      className={styles['update-animation']}
    />
  );
};
