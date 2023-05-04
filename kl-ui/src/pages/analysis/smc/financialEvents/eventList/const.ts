import {EventImportance} from 'kl-web-common/models/api/info/financialEvents';

import styles from './main.module.scss';


export const accordionStyles: {[importance in EventImportance]: string} = {
  low: styles['event-item-low'],
  medium: styles['event-item-medium'],
  high: styles['event-item-high'],
};
