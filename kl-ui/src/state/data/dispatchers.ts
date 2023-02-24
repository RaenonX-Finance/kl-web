import {createAction} from '@reduxjs/toolkit';
import {MinChangeData} from 'kl-web-common/models/socket/minChange';

import {DataDispatcherName} from './types';


export const dataDispatchers = {
  [DataDispatcherName.MIN_CHANGE]: createAction<MinChangeData>(DataDispatcherName.MIN_CHANGE),
};
