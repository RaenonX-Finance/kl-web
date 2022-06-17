import styles from './main.module.scss';
import {StrengthIndex} from './type';


export const strengthStyleLookup: {[index in StrengthIndex]: string} = {
  [-3]: styles['text-indicator-bear-3'],
  [-2]: styles['text-indicator-bear-2'],
  [-1]: styles['text-indicator-bear-1'],
  [0]: styles['text-indicator-neutral'],
  [1]: styles['text-indicator-bull-1'],
  [2]: styles['text-indicator-bull-2'],
  [3]: styles['text-indicator-bull-3'],
};

export const strengthTextLookup: {[index in StrengthIndex]: string} = {
  [-3]: '空方 3 檔',
  [-2]: '空方 2 檔',
  [-1]: '空方 1 檔',
  [0]: '多空交戰',
  [1]: '多方 1 檔',
  [2]: '多方 2 檔',
  [3]: '多方 3 檔',
};
