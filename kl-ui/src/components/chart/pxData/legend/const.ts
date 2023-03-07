import {PxMomentumIndex} from 'kl-web-common/models/pxDataBar';

import styles from './main.module.scss';


export const momentumIndicatorStyleLookup: {[index in PxMomentumIndex]: string} = {
  [-3]: styles['momentum-indicator-bear'],
  [-2]: styles['momentum-indicator-bear'],
  [-1]: styles['momentum-indicator-bear'],
  [0]: styles['momentum-indicator-neutral'],
  [1]: styles['momentum-indicator-bull'],
  [2]: styles['momentum-indicator-bull'],
  [3]: styles['momentum-indicator-bull'],
};
