import styles from './main.module.scss';
import {StrengthIndex} from './type';


export const strengthIndicatorStyleLookup: {[index in StrengthIndex]: string} = {
  [-3]: styles['strength-indicator-bear-3'],
  [-2]: styles['strength-indicator-bear-2'],
  [-1]: styles['strength-indicator-bear-1'],
  [0]: styles['strength-indicator-neutral'],
  [1]: styles['strength-indicator-bull-1'],
  [2]: styles['strength-indicator-bull-2'],
  [3]: styles['strength-indicator-bull-3'],
};

export const strengthBorderStyleLookup: {[index in StrengthIndex]: string} = {
  [-3]: styles['strength-border-bear-3'],
  [-2]: styles['strength-border-bear-2'],
  [-1]: styles['strength-border-bear-1'],
  [0]: styles['strength-border-neutral'],
  [1]: styles['strength-border-bull-1'],
  [2]: styles['strength-border-bull-2'],
  [3]: styles['strength-border-bull-3'],
};
