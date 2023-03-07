import React from 'react';

import styles from './main.module.scss';
import {MainLoading} from '../../../common/loading/main';


export const PxChartLayoutConfigUpdating = () => (
  <div className={styles['updating']}>
    <MainLoading text="更新中..."/>
  </div>
);
