import React from 'react';

import {useAnimation} from '../../../hooks/animation';
import {usePxDataLastUpdateSelector} from '../../../state/pxData/selector';
import {PxSlotName} from '../../../types/pxData';
import {SocketPingableTimeAgo} from '../../timeAgo/pingable';
import styles from './main.module.scss';


type Props = {
  slot: PxSlotName,
};

export const PxChartLastUpdate = ({slot}: Props) => {
  const lastUpdate = usePxDataLastUpdateSelector(slot);
  const updateIndicatorRef = useAnimation({deps: [lastUpdate]});

  return (
    <SocketPingableTimeAgo
      ref={updateIndicatorRef}
      epochSec={lastUpdate || 0}
      format={(secDiffMs) => (
        <><i className="bi bi-activity"/>&nbsp;{secDiffMs.toFixed(0)}</>
      )}
      updateMs={100}
      className={styles['update-animation']}
    />
  );
};
