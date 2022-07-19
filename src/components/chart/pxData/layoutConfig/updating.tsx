import React from 'react';

import {MainLoading} from '../../../common/loading/main';
import styles from './main.module.scss';


export const PxChartLayoutConfigUpdating = () => (
  <div className={styles['updating']}>
    <MainLoading text="Updating..."/>
  </div>
);
