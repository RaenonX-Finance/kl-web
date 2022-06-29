import styles from './main.module.scss';
import {StrengthIndexCanNA} from './type';


export const strengthIndicatorStyleLookup: {[index in StrengthIndexCanNA]: string} = {
  [-3]: styles['strength-indicator-bear'],
  [-2]: styles['strength-indicator-bear'],
  [-1]: styles['strength-indicator-bear'],
  [0]: styles['strength-indicator-neutral'],
  [1]: styles['strength-indicator-bull'],
  [2]: styles['strength-indicator-bull'],
  [3]: styles['strength-indicator-bull'],
  '?': styles['strength-indicator-na'],
};
